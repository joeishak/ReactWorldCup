import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CardColors from '../../assets/css/card-colors.css';
export class StatsCard extends Component {

  constructor(props){
    super(props);
    console.log('start ccard props: ', props)
    if(this.props.background==undefined){
      this.state = {
        background: 'white'
      }
    }
    else{
      this.state = {
        background: this.props.background
      }
    }
    
  }
  handleClick(event){
    console.log(event.target);
  }
  render() {
    return (
      <div  onClick = {this.handleClick} className="card purple card-stats">
        <div className={"content  "+ this.state.background}>
          <Row>
            <Col xs={0}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col xs={12} className="text-center">
              <div className="numbers text-center">
                <p className="text-center" >{this.props.statsText}</p>
                
                <p className="text-center" >{this.props.statsValue}</p>
                
              </div>
            </Col>
          </Row>
          <div className="footer text-center">
            <hr />
            <div className="stats text-center">
              {this.props.statsIcon} {this.props.statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
