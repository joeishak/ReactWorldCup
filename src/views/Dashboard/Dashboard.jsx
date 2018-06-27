//NPM Modules
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

// Custom App Component
import App from 'components/App.jsx';
import LoadingPage from 'components/LoadingPage.jsx';
import Styles from '../../assets/css/app.css'


// Custom Components
// import { Card } from "components/Card/Card.jsx";
// import { StatsCard } from "components/StatsCard/StatsCard.jsx";
// import { Tables } from "components/Tables/Tables.jsx";
// import  CustomButtom  from "../../components/CustomButton/CustomButton.jsx";
// import CustomLineChart from 'components/ChartJSCharts/CustomLineChart';

// import ChartistGraph from "react-chartist";
// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import {
//   dataPie,
//   legendPie,
//   dataSales,
//   optionsSales,
//   responsiveSales,
//   legendSales,
//   dataBar,
//   optionsBar,
//   responsiveBar,
//   legendBar
// } from "variables/Variables.jsx";

class Dashboard extends Component {
  constructor(props){
    super(props);
    // Declare State And Initialize Intial State
    this.state={
      justLanded:true,
      app: <App />,
      currentComponent: <Grid fluid  className='dashboardGrid'> 
      <Row>
          <Col lg={12} className="text-center dashboardTitleContainer">
              <a className='dashboardHeaderText' target="_blank" href="https://www.fifa.com/worldcup/"> 2018 FIFA World Cup - Russia</a>  
          </Col>
      </Row>
      </Grid>,
      loadingScreen:  <LoadingPage />,
      isLoading: true
    }
    //Make requests to re-initialize State with data from Node JS Server
  }

  // UPDATING STATE
  componentDidMount() { 
     //Add Code Here Set Back to 5000 
     this.interval = setTimeout(()=> this.setState({currentComponent: this.state.app}),5000)
  }
  componentDidUpdate() {
     
  }
  
  render() {
    return (
      <div className="content" height='100vh'>
        {this.state.currentComponent}
      </div>
    );
  }
}

export default Dashboard;
