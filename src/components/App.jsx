import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import ChartistGraph from "react-chartist";

import { Card } from "components/Card/Card.jsx";
import Styles from '../assets/css/app.css';
import AnimateHeight from 'react-animate-height';
import { Tables } from "components/Tables/Tables.jsx";


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
  } from "../variables/Variables.jsx";


  function getStandingTableValues(){
    return axios.get('http://192.168.1.2/api/football/standing-table-values')
  }
export default class App extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            //Height of ...
            height: 0,
            //For the Cards on the left and right
            groupA:[],
            groupB:[],
            groupC:[],
            groupD:[],
            groupE:[],
            groupF:[],
            groupG:[],
            groupH:[],
            lineData:  [
                {name: '', yellows: 5, reds: 4, goals: 3},
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
            groupASelected: true,
            groupBSelected: false,
            groupCSelected: false,
            groupDSelected: false,
            groupESelected: false,
            groupFSelected: false,
            groupGSelected: false,
            groupHSelected: false,
            standingTableValues: [{
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
            }]
        }
    //   this.animateGroup = this.animateGroup.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.findMatch = this.findMatch.bind(this);

     //1. state.standingsValuesstandings
     axios.all([getStandingTableValues()])
     .then((response)=>{
    //    console.log(response[0].data.DBResponse);
       this.setState({standingTableValues: response[0].data.DBResponse})
     });
     axios({
       method: 'get',
       url:'http://192.168.1.2:80/api/worldcup/stadium-locations'
     }).then((response) => {
       // console.log("Response from the api",response);
       this.setState({stadiums:response.data.stadiums});
  
     });
    }//End Constructor 

    componentDidMount(){
        //When the component Loads
        // this.setState({height:'25%'})
        // setTimeout(this.setState({height: '25%' }),1000)
         this.getTeams();
    }
   
    //Custom API CAll for Group,Team,Flag Data for the Cards on the side of the page
  //This function sets the state for each groupType (GroupA, GroupB). 
  // Use this Data to pass to the cards for displaying flag
  getTeams(){
    //Method to get DAta for the Stadium Capacity
    axios({
      method: 'get',
      url:'http://192.168.1.2/api/football/team-groups'
    }).then((response) =>{

      console.log(response);
      
      for(let i = 0;i<response.data.length;i++){
        let newStateArray = [];
        switch(response.data[i].Group){
          case 'A':
          newStateArray = this.state.groupA;
          newStateArray.push({
            Group: 'A',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupA: newStateArray});
          break;
          
          case 'B':
          newStateArray = this.state.groupB;
          newStateArray.push({
            Group: 'B',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupB:newStateArray});
          break;
          case 'C':
          newStateArray = this.state.groupC;
          newStateArray.push({
            Group: 'C',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupC:newStateArray});
          break;
          case 'D':
          newStateArray = this.state.groupD;
          newStateArray.push({
            Group: 'D',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupD:newStateArray});
          break;
          case 'E':
          newStateArray = this.state.groupE;
          newStateArray.push({
            Group: 'E',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupE:newStateArray});
          break;
          case 'F':
          newStateArray = this.state.groupF;
          newStateArray.push({
            Group: 'F',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupF:newStateArray});
          break;
          case 'G':
          newStateArray = this.state.groupG;
          newStateArray.push({
            Group: 'G',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupG:newStateArray});
          break;
          case 'H':
          newStateArray = this.state.groupH;
          newStateArray.push({
            Group: 'H',
            Team: response.data[i].Team,
            Flag: response.data[i].Flag
          });
          this.setState({groupH:newStateArray});
        }
      }
      console.log(this.state);
    });
  }

  

  findMatch(e){
      if(e.activeLabel!=null){ 
        // console.log(e.activeLabel);
      }
  }
    render(){
      
        // const { height } = this.state;
        return(
            <div className='content'>
                <Grid fluid  className='dashboardGrid'> 
                    <Row>
                        <Col lg={12} className="text-center dashboardTitleContainer">
                            <h2 className='dashboardHeaderText'> 2018 FIFA World Cup - Russia</h2>  
                        </Col>
                    </Row>
                           
                
                    <Row  >
                        <Col lg={2} >
                       
                            <Card
                                id="groups"
                                title={"Group A"}
                                flags={this.state.groupA}
                                selected={this.state.groupASelected}
                                onDoubleClick={status=>{this.setState({GroupASelected:status})}}
                                />
                            <Card
                                id="groups"
                                title={"Group B"}
                                selected={this.groupASelected}
                                flags={this.state.groupA}                                
                                />
                            <Card
                                statsIcon=""
                                title={"Group C"}
                                flags={this.state.groupA}                               
                                />
                            <Card
                                id="groups"
                                title={"Group D"}
                                flags={this.state.groupD}                               
                                />       
                            
                        </Col>
                        <Col lg={8}>
                                <Card
                                height='100%'
                                statsIcon=""
                                id="chartYellos"
                                title="Group Stats"
                                category=""
                                stats=""
                                content={
                                <div className="">
                                <Row>
                                 <Col md={12}>
                                    <Tables 
                                        standingTableValues={this.state.standingTableValues} 
                                        onSelect={(row,isSelected,e)  =>{this.setState({chosenTeam:row['Team']})}} >
                                    </Tables>
                                </Col>
                                <Col md={12}>
                                    <LineChart onClick={this.findMatch} width={600} height={400} data={this.state.lineData}
                                        margin={{top: 5, right: 10, left: 0, bottom: 5}}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/><LineChart />
                                        <CartesianGrid stroke="black" strokeDasharray="3 3"/>
                                        <Tooltip />
                                    
                                        <Line type="monotone" dataKey="yellows" stroke="yellow" activeDot={{r: 8}}/>
                                        <Line type="monotone" dataKey="reds" stroke="red" />
                                        <Line  type="monotone" dataKey="goals" stroke="green" />
                                    </LineChart>
                                </Col>
                                </Row>
                                </div>}
                                />
                                </Col>
                                                                
                        <Col lg={2} >
                                <Card
                                    id="groups"
                                    title={"Group E"}
                                    flags={this.state.groupE}                                
                                    />
                               
                                <Card
                                    id="groups"
                                    title={"Group F"}
                                    flags={this.state.groupF}                                
                                    />
                           
                                <Card
                                    id="groups"
                                    title={"Group G"}
                                    flags={this.state.groupG}                                
                                    />
                          
                                <Card
                                    id="groups"
                                    title={"Group H"}
                                    flags={this.state.groupH}                                
                                    />
                        </Col>

                    </Row>
                    
                </ Grid> 
            </div>
        )
    }
    
    
};//End Default Class App 