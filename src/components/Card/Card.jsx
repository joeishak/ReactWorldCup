import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Styles from '../../assets/css/app.css';
import AnimateHeight from 'react-animate-height';
import { create } from "domain";

export class Card extends Component {
  constructor(props){
    super(props);
    this.state= {
      height: 0,
      flags: this.props.flags,
      selected: this.props.selected,
      changeStatus: this.props.onDoubleClick
    }
    
    console.log(this.state.flags);
    this.createFlags = this.createFlags.bind(this);

  }
  componentDidMount(){
    this.setState({height: '10%'});
    if(this.props.height!=undefined){
      // console.log('Ive got a height');
      this.setState({height:this.props.height})
    }
    if(this.props.selected){

    }
  }

  createFlags(){

    if(this.state.flags!=undefined){
      this.state.flags.map(country =>{
        return(
            <img src={country.Flag} />
        )
      });
    }
                                   
    
  }
  render() {
    return (
          <AnimateHeight
            key={this.state.group}
            duration={ 1000 }
            height={ this.props.height ? this.props.height: this.state.height } // see props documentation bellow
            >
      <div className={"transition " +  " card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.selected ? " selected" :"") +(this.props.hCenter ? " text-center" : "")}>
          <h4 className="title text-center">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={
            (this.props.selected ? " selected " :"") +
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
         {this.props.content ? this.props.content : (this.state.flags.map(country=>{
           
             <img key={country.team} src={country.flag} />
           
         }))}

          <div className="footer">
            {this.props.legend}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
      </AnimateHeight>
      
    );
  }
}

export default Card;
