import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';


export default class CustomLineChart extends Component{
    constructor(props){
        super(props);

        this.state = {
            data:{
                labels: ['Jan','Feb'],
                datasets: [
                    {
                        label: 'First Data Set',
                        fill: false,
                        data: [23,56]
                    }
                ]
            }
        };


    }
    
    render() {
        return(
            <Line data={this.state.data} />
        )
    }
};
