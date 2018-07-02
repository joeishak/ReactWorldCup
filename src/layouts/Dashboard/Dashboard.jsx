import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import axios from 'axios';
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import { style } from "variables/Variables.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends Component {

  
  //Class Initializer Function
  constructor(props) {
    super(props);
    //Bind any isntance of these classes methods to keyword this
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.UpdateAPI = this.UpdateAPI.bind(this);
    this.UpdateMatches = this.UpdateMatches.bind(this);
    this.UpdateTeams = this.UpdateTeams.bind(this);
    this.UpdateStandings = this.UpdateStandings.bind(this);
    this.CheckForPost = this.CheckForPost.bind(this);

    //Initialize State
    this.state = {
      _notificationSystem: null,
      Teams: [],
      Standings: [],
      Matches: []

    };
  }//End Constructor

  componentDidMount() {
    // this.UpdateStandings();
    this.UpdateTeams();
    // this.UpdateMatches();
  }

  CheckForPost() {
   console.log(this.state.Teams.length);
    if (this.state.Teams.length == 32) {
      console.log("Teams");
      console.log(this.state.Teams);

      axios.post('http://localhost:8010/extract/footballapi/Teams', this.state.Teams)
        .then(customPostRes => {
          console.log('I got a response after posting Teams');
          console.log(customPostRes);
        });
    }
  }

  UpdateStandings() {
  
    axios.get('http://api.football-api.com/2.0/standings/1056?Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
      .then(standingRes => {
        /**Uncomment when you want to test if you have exceeded API Request Limit */
        // console.log("The response from the Football-Api.com for Standings: ");
        // console.log(standingRes);

        let Standings = standingRes.data;
        
        this.setState({ Standings: Standings })
        console.log("Standings Length: " + this.state.Standings.length);

        axios.post('http://localhost:8010/extract/footballapi/standings', this.state.Standings)
          .then(customPostRes => {
            console.log('I got a response after posting Standings');
            console.log(customPostRes);
          });
      }); //End call for Standings
  }

  UpdateTeams() {


    axios.get('http://api.football-api.com/2.0/standings/1056?Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
      .then(standingRes => {
        let Standings = standingRes.data;
        console.log(Standings);
        for (let i = 0; i < Standings.length; i++) {
          let team = Standings[i].team_id
          axios.get('http://api.football-api.com/2.0/team/' + team + '?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
            .then(teamRes => {
              // console.log(teamRes);

              this.setState({ Teams: [...this.state.Teams, teamRes.data] })
              // this.setState({ Teams: NewTeams });
              console.log("Teams Length: " + this.state.Teams.length);
              this.CheckForPost()
            });//End Call For Teams
        }//end for

        
        // console.log("The Teams state after adding all the New Teams to State:");
        // console.log(this.state.Teams);
        // this.CheckForPost();
      });

   
    
  }

  UpdateMatches() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;

    day = (day < 10) ? `0${day}` : day;
    month = (month < 10) ? `0${month}` : month;
    let stringDate = day + '.' + (month) + '.2018';
    let NewTeams = [];
    // console.log(stringDate); 
    // console.log('State before the api calls' );
    // console.log( this.state);


    axios.get('http://api.football-api.com/2.0/matches?comp_id=1056&from_date=02.06.2018 &to_date=' + stringDate + '&Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
      .then(matchRes => {
        console.log("The response from the Football-api.com for the current Matches");
        console.log()
        let Matches = matchRes.data;
        console.log('The Matches State after making a request for Current Matches: ')
        console.log(Matches);
        this.setState({ Matches })
        console.log("Matches Length:" + this.state.Matches.length);
        // console.log(this.state.Matches);   
        
        axios.post('http://localhost:8010/extract/footballapi/matches', this.state.Matches)
      .then(customPostRes => {
        console.log('I got a response after posting the Matches');
        console.log(customPostRes);
      });
      });//End Call for Matches

    
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        {/* <Sidebar {...this.props} /> */}
        {/* {console.log(this.props)} */}
        <div id="" className="" ref="">
          {/* <Header {...this.props} /> */}
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }

}

export default Dashboard;
