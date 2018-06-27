import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
// import {Table} from "components/Tables/Tables.jsx"
import ReactTable from 'react-table'
import "react-table/react-table.css";
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
import match from '../../assets/img/match.png';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
    
    // this.getData = this.getData.bind(this);
    
    this.state = {
      matches:[],
      numberOfMatches:dataSales,
      totalMatches:0,
      totalRounds: 0,
      totalMatchTypes: 0,
      tableData: [
        {
          match:1,
          home: 'argentina',
          homegoals: 3,
          away:'russia',
          awaygoals: 6,
          total: 98
        },
        {
          match:1,
          home: 'argentina',
          homegoals: 3,
          away:'russia',
          awaygoals: 6,
          total: 44
        },
        {
          match:1,
          home: 'argentina',
          homegoals: 3,
          away:'russia',
          awaygoals: 6,
          total: 22
        }
      ],
      tableColumns: [
        {
          Header:'Match',
          accessor: 'match'
        },
        {
          Header: 'Home',
          accessor: 'home'
        },
        {
          Header: 'Home Goals',
          accessor: 'homegoals'
        },
        {
          Header: 'Away',
          accessor: 'away'
        },
        {
          Header: 'Away Goals',
          accessor: 'awaygoals'
        },
        {
          Header: 'Total',
          accessor: 'total'
        }
      ]

      
    };
    //Use custom api to get high scoring matches
    axios({
      method: 'get',
      url:'http://192.168.1.2:80/api/worldcup/match-high-scores'
    }).then((response) =>{
      // console.log("Response for the high scoring games in the matches",response);
      this.setState({tableData:response.data});
 
    });
    //Use custom api to get totals for each match 
    axios({
      method: 'get',
      url:'http://192.168.1.2:80/api/worldcup/match-type-totals'
    }).then((response) =>{
      console.log("Response for the number of matches played at each type of round",response);
      this.setState({'match-stadiums':response.data.stadiums});
 
    });
    // Bar Chart for Type of Match and Number of them
    axios({
      method: 'get',
      url:'http://192.168.1.2/api/worldcup/match-type-totals'
    }).then((response) =>{
      console.log("Response from the Match Stadiums api",response);
      let labels = response.data.map(match=>{
        return match["Type of Match"];
      });
      let series = response.data.map(match=>{
        return match["Number of Matches"];
      })
      console.log(labels);
      
      console.log(series);
      this.setState({
        numberOfMatches:{
          labels:labels,
          series: [series]
        }
      });
      console.log(this.state);
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

  render() {
    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={12}>
              <StatsCard
                background = "purple"
                bigIcon={<img src={match}  />}
                statsText="Total Matches"
                statsValue="105"
                statsIcon={<i className=" " />}
                statsIconText=""
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                background = "blue"              
                bigIcon={<img src={match}  />}
                statsText="Total General Round Matches"

                statsValue="105"
                statsIcon={<i className=" " />}
                statsIconText=""
              />
            </Col>
            <Col lg={4} sm={12}>
              <StatsCard
                background = "yellow"              
                bigIcon={<img src={match}  />}
                statsText="Total Matches"
                statsValue="105"
                statsIcon={<i className=" " />}
                statsIconText=""
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
            <Card
                statsIcon="fa fa-clock-o"
                title="Highest Scoring Matches"
                category=""
                stats=""
                content={
                  <div>
                  <ReactTable 
                  className="text-center"
                  showPagination={false}
                  data = {this.state.tableData}
                  columns = {this.state.tableColumns}
                  />
                  </div>
                }
               
              />

            </Col>
    
            <Col md={4}>
            <Card
                id="chartActivity"
                title="Number Of Matches per Round"
                category=""
                stats=""
                statsIcon=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.numberOfMatches}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
               
              />
               <Card
                statsIcon="fa fa-clock-o"
                title="Team Goals"
                category="Top 3 Goal Scoring Teams"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendPie)}</div>
                // }
              />
              
            </Col>
          </Row>

          <Row>
            <Col md={4}>
           
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
