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
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null,
      Teams: [],
      Standings:[],
      Matches:[]
        };
    this.UpdateAPI = this.UpdateAPI.bind(this);


   
    // this.UpdateStandings = this.UpdateStandings.bind(this);
    // this.UpdateMatches = this.UpdateMatches.bind(this);
    // this.UpdateTeams = this.UpdateTeams.bind(this);
  // });
  }
    
    UpdateAPI() {
      let today = new Date();
      let day = today.getDate(); 
      let month = today.getMonth() +1;

      day = (day <10) ? `0${day}`: day;
      month = (month<10) ? `0${month}` : month;
      let stringDate = day + '.' + (month) + '.2018';

      // console.log(stringDate); 
      // console.log('State before the api calls' );
      // console.log( this.state);
      let NewTeams = [];

      axios.get('http://api.football-api.com/2.0/standings/1056?Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
        .then( standingRes => {
            console.log("The response from the Football-Api.com for Standings: ");
            console.log(standingRes);

            let Standings = standingRes.data;
            this.setState({Standings: Standings})
           
            console.log('State after adding Standings');
            console.log(this.state);
            
            // //Post Standings to Infosol Cutsom API
            // axios.post('http://localhost:8010/extract/footballapi/standings',this.state.Standings)
            //     .then(postRes => {
            //       console.log("Response from Infosol Custom API ");
            //       console.log(postRes.data);
            // });    

            for(let i = 0; i<this.state.Standings.length;i++){
                let team = this.state.Standings[i].team_id
                axios.get('http://api.football-api.com/2.0/team/'+team+'?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
                .then( teamRes =>{
                  NewTeams.push(teamRes.data);
                });//End Call For Teams
            }//end for

            this.setState({Teams:NewTeams});

            console.log("The Teams state after adding all the New Teams to State:");
            console.log(this.state.Teams);
           


        axios.get('http://api.football-api.com/2.0/matches?comp_id=1056&from_date=01.08.2014&to_date='+stringDate+'&Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
        .then( matchRes => {
            console.log("The response from the Football-api.com for the current Matches");
            console.log()
            let Matches = matchRes.data;
            console.log('The Matches State after making a request for Current Matches: ')
            this.setState({Matches})
            // console.log(this.state.Matches);


            let body = {
                Standings: this.state.Standings,
                Matches: this.state.Matches,
                Teams: this.state.Teams
            };
            console.log("The Body");
            console.log(body);

            axios.post('http://localhost:8010/extract/footballapi/', body)
                .then(customPostRes =>{
                console.log('I got a response after posting the body');
                console.log(customPostRes.data);
            });
         
        });//End Call for Matches

    }); //End call for Standings
//    


}

  
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    this.UpdateAPI();
    setInterval(()=> {
      this.UpdateAPI();
         

 }, 900000 );
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
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
