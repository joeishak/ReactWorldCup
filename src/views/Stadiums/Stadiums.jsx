
//NPM Modules
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Chart } from 'react-google-charts';
// Custom App Component
import App from 'components/App.jsx';
import LoadingPage from 'components/LoadingPage.jsx';

import Styles from '../../assets/css/app.css';

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

    // Declare State And Initialize Intial State
    this.state={
      justLanded:true,
      app:  <Chart
            className ='comboBar'
            chartType="ComboChart"
            data={[['Group', 'Reds','Yellow Reds','Yellows','Goals'], 
                    ['A',0, 0,4,6], 
                    ['B',0, 0,4,5], 
                    ['C',0, 0,3,5], 
                    ['D',0, 0,6,3], 
                    ['E',0, 0,7,2], 
                    ['F',0, 0,2,3], 
                    ['G',0, 0,0,0],
                    ['H',0, 0,0,0]]}
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
            
          />,
      currentComponent: <LoadingPage />,
      loadingScreen:  <LoadingPage />,
      isLoading: true,
      groupA: [
        {Event:'Red Cards', Total: 2, label: "Red Cards: "+ 2},
        {Event:'Yellow Red Cards', Total:5, label: "Yellow Red Cards: "+ 2},
        {Event:'Yellow Cards', Total: 4, label: "Yellow Cards: "+ 2},
        {Event:'Goals', Total: 2, label: "Goals: "+ 2},
       ]
    }
   



    //Make requests to re-initialize State with data from Node JS Server
  }

  // UPDATING STATE
  componentDidMount() { 
     //Add Code Here Set Back to 5000 
     this.interval = setTimeout(()=> this.setState({currentComponent: this.state.app}),3000)
    
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
