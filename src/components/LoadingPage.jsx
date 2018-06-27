import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";

import Loading from 'react-loading-components';
import Styles from '../assets/css/app.css';
export default class CustomLoadingPage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentColor: '#c158dc',
            colors: ['#fa5788','#ff77a9','#ae52d4','#df78ef','#8559da','#b085f5','#666ad1','#8e99f3','#63a4ff','#80d6ff','#5eb8ff','#73e8ff','#56c8d8','#48a999','#64d8cb']
          
        }

    }//End Constructor 
    
    componentDidMount(){
        //When the component Loads
        // console.log(count);
        let count= 0;
        


        setInterval(()=> {
            this.setState({currentColor: this.state.colors[count] });
            count++;
            if(count>14) count=0;
        },300)
    }
    compon(){
        
;        
    }

    // Loading Type
    // audio
    // ball_triangle
    // bars
    // circles
    // grid
    // hearts
    // oval
    // puff
    // rings
    // spinning_circles
    // tail_spin
    // three_dots
    render(){
        return(
            <Grid fluid className='grid'>
                <Row>
                    <Col md={12} className=" loadingTitleContainer text-center">
                        {/* <div className='loadingpage pd-5'>Sit Tight</div>
                        <div className='loadingpage'>While We Prepare Your Dashboarding Experience</div>
                         */}
                        
                    </Col>
                    <Col md={2}>
                    </ Col> 
                    <Col md={8} lg={8}  className='LoadingContainer text-center' >
                        <Loading type='bars' width='100' height='100' fill={this.state.currentColor} />    
                    </Col>
                    <Col md={2}>
                    </ Col> 
                </Row>
            </Grid>
            
        )
    }
    
};//End Default Class App 
