import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import axios from 'axios';


import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tables } from "components/Tables/Tables.jsx";
import  CustomButtom  from "../../components/CustomButton/CustomButton.jsx";
import CustomLineChart from 'components/ChartJSCharts/CustomLineChart';

import ChartistGraph from "react-chartist";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

function getStandingTableValues(){
  return axios.get('http://192.168.1.2/api/football/standing-table-values')
}
class Dashboard extends Component {
  constructor(props){
    super(props);

    // Declare State And Initialize Intial State
    this.state={
      stadiums: [],
      totalCapacity:4,
      totalStadiums: 5,
      lineData:  [
        {name: '06-14-2018', yellows: 5, reds: 4, goals: 3},
        {name: '06-15-2018', yellows: 3, reds: 2, goals: 1},
        {name: '06-16-2018', yellows: 3, reds: 3, goals: 4},
        {name: '06-17-2018', yellows: 2, reds: 2, goals: 1},
        {name: '06-18-2018', yellows: 3, reds: 2, goals: 5},
        {name: '06-19-2018', yellows: 1, reds: 4, goals: 1},
        {name: '06-20-2018', yellows: 3, reds: 2, goals: 3},
        {name: '06-21-2018', yellows: 4, reds: 2, goals: 1},
        {name: '06-22-2018', yellows: 3, reds: 5, goals: 1}
        ],
      totalMatchesAtEachStadium: dataSales,
      groupCardData:[],
      standingTableValues:[{
            Position: 1,
            Team: 'Greece',
            Wins: 2,
            Losses: 3,
            Goals: 23
        },
        {
            Position: 2,
            Team: 'Spain',
            Wins: 2,
            Losses: 3,
            Goals: 23
        }],
      chosenTeam: {},
      chosenTeamData:[],
      chosenGroupData:[],
      groupASelected: true,
      groupBSelected: false,
      groupCSelected: false,
      groupDSelected: false,
      groupESelected: false,
      groupFSelected: false,
      groupGSelected: false,
      groupHSelected: false,
      groupButtonClicked:[

      ]
    }

    //Make requests to re-initialize State with data from Node JS Server
 
    //1. state.standingsValuesstandings
    axios.all([getStandingTableValues()])
    .then((response)=>{
      console.log(response[0].data.DBResponse);
      this.setState({standingTableValues: response[0].data.DBResponse})
    });
    axios({
      method: 'get',
      url:'http://192.168.1.2:80/api/worldcup/stadium-locations'
    }).then((response) =>{
      // console.log("Response from the api",response);
      this.setState({stadiums:response.data.stadiums});
 
    });

    //Method to get Data for the Stadium Capacity
    axios({
      method: 'get',
      url:'http://192.168.1.2/api/worldcup/total-stadium-capacity'
    }).then((response) =>{
      // console.log("Response from the api",response);
      this.setState({totalCapacity:response.data[0]["Total Attendee Capacity"]});
 
    });

    //Method to get DAta for the Stadium Capacity
    axios({
      method: 'get',
      url:'http://192.168.1.2/api/worldcup/match-stadiums'
    }).then((response) =>{
      // console.log("Response from the Match Stadiums api",response);
      let labels = response.data.map(stadium=>{
        return stadium.Stadium;
      });
      let series = response.data.map(stadium=>{
        return stadium["Total Matches Held"];
      })
      // console.log(labels);
      // console.log(series);
      this.setState({
        totalMatchesAtEachStadium:{
          labels:labels,
          series: series
        }
      });
      // console.log(this.state);
    });
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  // UPDATING STATE
  componentDidMount() {   
}

  handleGroupButtonClick(e){

  //   let chosenGroupData = this.state.chosenGroupData;
  //  chosenGroupData.push()
    switch(e.target.value){
      case "A":
 
        const style = this.state.groupASelected ? "background-color: #00e676; color: black;" : "background-color: grey; color: white;";
        const  select = !this.state.groupASelected ? true : false;
        e.target.style = style;
        this.setState(
          {
            groupASelected: select
          }
        )
        
      // if(!this.state.groupASelected){
      //   e.target.style = "background-color: #00e676; color: black;";
      //   this.setState({groupASelected:true});
      // } else {
      //   e.target.style = "background-color: grey; color: white;";
      //   this.setState({groupASelected:false});
      // }
      break;
      case "B":
      if(!this.state.groupBSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupBSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupBSelected:false});
        
      }
      break;
      case "C":
      if(!this.state.groupCSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupCSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupCSelected:false});
        
      }
      break;
      case "D":
      if(!this.state.groupDSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupDSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupDSelected:false});
        
      }
      break;
      case "E":
      if(!this.state.groupESelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupESelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupESelected:false});
        
      }
      break;
      case "F":
      if(!this.state.groupFSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupFSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupFSelected:false});
        
      }
      break;
      case "G":
      if(!this.state.groupGSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupGSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupGSelected:false});
      }
      break;
      case "H":
      if(!this.state.groupHSelected){
        e.target.style = "background-color: #00e676; color: black;";
        this.setState({groupHSelected:true});
      } else {
        e.target.style = "background-color: grey; color: white;";
        this.setState({groupHSelected:false});
        
      }
      break;
    }
    this.retrieveGroupStandings();
  }

  retrieveGroupStandings(){
    axios.get('localhost/api/football/groupstandings')
  }

  sayHi(e){
    console.log("The user chose ");
    console.log(e.activeLabel);
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Card
                statsIcon=""
                id="groups"
                title="World Cup Groups"
                category=""
                stats=""
                content={
                  <div className="">
                    
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
             <Card
                statsIcon=""
                id="groups"
                title="World Cup Groups"
                category=""
                stats=""
                content={
                  <div className="">
                    
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
             <Card
                statsIcon=""
                id="groups"
                title="World Cup Groups"
                category=""
                stats=""
                content={
                  <div className="">
                    
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />  
          </Row>

          <Row> 
            <Col md={3}>
              
            </Col>
            <Col md={9}>
                <h6 className="text-center"> Yellows, Reds, and Goals Per Match </ h6>
              <LineChart onClick={this.sayHi} width={1000} height={500} data={this.state.lineData}
                margin={{top: 5, right: 10, left: 10, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/><LineChart />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
            
                <Line type="monotone" dataKey="yellows" stroke="#c7cc00" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="reds" stroke="#d50000" />
                <Line  type="monotone" dataKey="goals" stroke="#82ca9d" />
              </LineChart>
            </Col>
            <Col md={9}>
              <Card
                statsIcon=""
                id="chartYellos"
                title="Total Yellow Cards"
                category=""
                stats=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={{
                        labels: this.state.totalMatchesAtEachStadium.labels,
                        series: [this.state.totalMatchesAtEachStadium.series]
                      }}
                      // data={dataSales}
                      type="Bar"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
            <Col md={9}>
              <Card
                statsIcon=""
                id="chartHours"
                title="Total Red Cards Per Match"
                category=""
                stats=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={{
                        labels: this.state.totalMatchesAtEachStadium.labels,
                        series: [this.state.totalMatchesAtEachStadium.series]
                      }}
                      // data={dataSales}
                      type="Bar"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendSales)}</div>
                // }
              />
            </Col>
          </Row>
          <Row>
           
          </Row>
          <Row>
            <Col md={6}>
                
            </Col>

            <Col md={6}>
           
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
