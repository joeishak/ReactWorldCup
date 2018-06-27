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
      teams: [],
      players: []
    };
    this.UpdateAPI = this.UpdateAPI.bind(this);
   
  }
  UpdateAPI(){
    
    
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let stringDate = day + '.' + (month+1) + '.2018';
    //Start Football API Get Requests to send to the Node JS API
   // 1. Standings * team data
   axios.get('http://api.football-api.com/2.0/standings/1056?Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
   .then( res => {
     let standings = res.data;
     this.setState({standings})
     for(let i = 0; i<31;i++){
      let team = this.state.standings[i].team_id
      axios.get('http://api.football-api.com/2.0/team/'+team+'?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
      .then( teamRes =>{
         let newTeam = teamRes.data;
         let teams = this.state.teams;
         teams.push(newTeam);
         this.setState({teams});
        //  console.log(this.state);
      });  
     }
     
     
     // axios.post('localhost/extract/footballapi/',this.state.standings)
     // .then(postRes =>{
      //  console.log(res.data);
     // })
   });

   // 2. Matches
   axios.get('http://api.football-api.com/2.0/matches?comp_id=1056&from_date=1.6.2018&to_date='+stringDate+'&Authorization=565ec012251f932ea4000001061fbec3b0f34d714a33b597c0415d4c')
   .then( res => {
     let matches = res.data;
     this.setState({matches})
     // axios.post('localhost/extract/footballapi/',this.state.standings)
     // .then(postRes => {
     //   console.log(res.data);
     // });
   });
   // 3. Teams
   

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
