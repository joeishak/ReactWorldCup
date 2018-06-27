import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-table'

 


export class Tables extends Component {


    constructor(props){
        console.log(props);
        super(props);
        this.state = {
            selectRowProp:{
                mode: 'radio',
                clickToSelect: true,
                unselectable: [],
                selected: [],
                onSelect: this.props.onSelect,
                bgColor: '00b248'
            }
        }

        
    }
    
    render() {
        

        // Do Stuff Here

 
        // Return what ever you want
        return(
            <BootstrapTable data = {this.props.standingTableValues}
                            selectRow={this.state.selectRowProp} 
                            striped 
                            hover  >
                <TableHeaderColumn dataField='Position'
                                    width='150' 
                                    isKey>
                Pos
                </TableHeaderColumn>
                <TableHeaderColumn dataField='Team'
                                    width="20%"> 
                Team 
                </TableHeaderColumn>
                <TableHeaderColumn dataField='Wins'
                                    width='100'> 
                W 
                </TableHeaderColumn>
                <TableHeaderColumn dataField='Losses'
                                    width='100'> 
                L 
                </TableHeaderColumn>
                <TableHeaderColumn dataField='Goals'
                    width='100'> 
                G 
                </TableHeaderColumn>
            </BootstrapTable>

        )
    }

}

export default Tables;