
//NPM Modules
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Chart } from 'react-google-charts';
// Custom App Component
import App from 'components/App.jsx';
import LoadingPage from 'components/LoadingPage.jsx';

import Styles from '../../assets/css/app.css';
import axios from "axios";

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

class Stadiums extends Component {
  constructor(props){
    super(props);
    let chartdata = [];
    
    // Declare State And Initialize Intial State
    this.state={
      justLanded:true,
     
      currentComponent: <LoadingPage />,
      loadingScreen:  <LoadingPage />,
      isLoading: true,
      
    }
   
    axios.get('http://vm3.infosol.com:8010/extract/footballapi/viz')
    .then( response => {
      this.setState({app:  <Chart
      className ='comboBar'
      chartType="ComboChart"
      data={response.data}
      componentDidMount
      options={{seriesType:'bars', is3D: true,
      backgroundColor:'#4A4A4A',
      colors: ['#e53935', '#fb8c00', '#ffeb3b', '#4caf50' ],
      hAxis: {gridlines: {color:'white'}, textStyle:{color:'white'}},
      vAxis: {gridlines: {color:'white'}, textStyle:{color:'white'}},
      legend:{textStyle:{color:'white'}}
      }}
      graph_id="ComboChart"
      width="100%"
      height="100vh"
      legend_toggle
      
    />})
    })


    //Make requests to re-initialize State with data from Node JS Server
  }

  // UPDATING STATE
  componentDidMount() { 
     //Add Code Here Set Back to 5000 
     this.interval = setTimeout(()=> {
      


      this.setState({currentComponent: this.state.app})
      
      
      
      }
       ,5000)
    
      setInterval(()=>{
        axios.get('http://localhost:8010/extract/footballapi/viz')
        .then( response => {
          this.setState({app:  <Chart
          className ='comboBar'
          chartType="ComboChart"
          data={response.data}
          componentDidMount
          options={{seriesType:'bars', is3D: true,
          backgroundColor:'#4A4A4A',
          colors: ['#e53935', '#fb8c00', '#ffeb3b', '#4caf50' ],
          hAxis: {gridlines: {color:'white'}, textStyle:{color:'white'}},
          vAxis: {gridlines: {color:'white'}, textStyle:{color:'white'}},
          legend:{textStyle:{color:'white'}}
          }}
          graph_id="ComboChart"
          width="100%"
          height="100vh"
          legend_toggle
          
        />})
        })
      },316000)
    
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

export default Stadiums
