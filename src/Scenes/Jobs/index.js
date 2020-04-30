import React, { Component } from 'react'
import DataTable from '../../Components/DataTable'




export class Jobs extends Component {
    state = {
        columns: [],
        jobs: [
        ]
    }



    componentDidMount = () => {
        this.setState(() => ({
            table: 'jobs',
            columns: [
                { 
                    id: 'id', 
                    numeric: false, 
                    disablePadding: false, 
                    label: '#' 
                },
                { 
                    id: 'code', 
                    numeric: false, 
                    disablePadding: false, 
                    label: 'Code' 
                },

                { 
                    id: 'description', 
                    numeric: false, 
                    disablePadding: false, 
                    label: 'Description' 
                }
            ]
                        
          }))                
    }

    render() {
        return (
            <div>
                <DataTable columns={this.state.columns} table={"jobs"} title="Jobs"/>
            </div>
        )
    }
}

export default Jobs


