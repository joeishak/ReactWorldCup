import React, { Component } from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6



export default class CustomButton extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      selected:this.props.clicked,
      backgroundColor:'grey',
      handleClick: this.props.onClick,
      style: styles.notClicked,
      value: this.props.value,
    };
    // this.handleClick = this.handleClick.bind(this);

  }
  //  handleClick(event){
  //   //  console.log(this.state);
  //   if(this.state.isClicked){
  //     this.setState({
  //       isClicked:false,
  //       style: styles.notClicked
  //     });
  //   }
  //   else this.setState({
  //     isClicked:true,
  //     style: styles.clicked});

  // }
  render() {
    const { fill, simple, pullRight, round, block,color, ...rest } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-round": round,
      "backgroundColor": color
    });

   
    // return <Button className={btnClasses} {...rest} />;
    // return <Button />
    return (
      <div>
       <Button className={btnClasses  } {...rest}
               style={this.state.style}
               onClick={this.state.handleClick}  >
                {"Group " + this.state.value}
        </Button>
      
      </div>
    );
  }
}

const styles = {
  clicked: {
    backgroundColor: 'green',
    color: 'black'
  },
  notClicked: {
    backgroundColor: 'grey',
    color: 'white'
  },
};
CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

