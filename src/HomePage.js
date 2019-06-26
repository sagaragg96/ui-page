import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class HomePage extends Component {
    state = {
        id: '',
        name: '',
        description: '',
        status:'',
        history: []
    }

    handleChange = (e) => {
            this.setState({
                [e.target.id]: e.target.value
            })
    
        }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {};
        obj.timestamp = new Date() + '';
        obj.old = 'New Merchant Created';
        obj.new = 'Merchant Name: ' + this.state.name + ', Description: ' + this.state.description + ', Status: ' + this.state.status;
        console.log("History Object : ", obj);
        let id = this.props.merchants.length + 1;
        this.setState({
            id,
            history: [obj]
        })
        setTimeout(() => {
            this.props.dispatch({
                type: 'ADD_MERCHANT',
                payload: this.state
            })
            console.log("Redux State is : ",this.props.merchants);
        }, 1000);
    }

    viewCellRendererFunc = (rdata) => {
        var espan = document.createElement('button');
        espan.classList.add("butn");
        espan.classList.add("red");
        espan.classList.add("lighten-1");
        espan.classList.add("z-depth-0");
        espan.innerHTML = "Edit";
        espan.setAttribute('href','#modal1');
        espan.addEventListener('click', () => {
            this.props.history.push({
                pathname: '/editMerchant',
                state: {
                    id: rdata.data.id,
                }
            });
        });

        var espan1 = document.createElement('button');
        espan1.classList.add("butn");
        espan1.classList.add("red");
        espan1.classList.add("lighten-1");
        espan1.classList.add("z-depth-0");
        espan1.innerHTML = "Delete";
        espan1.addEventListener('click', () => {
            this.handleDelete(rdata.data.id);
        });

        var espan2 = document.createElement('button');
        espan2.classList.add("butn");
        espan2.classList.add("red");
        espan2.classList.add("lighten-1");
        espan2.classList.add("z-depth-0");
        espan2.innerHTML = "Activate/Deactivate";
        espan2.addEventListener('click', () => {
            this.handleStatus(rdata.data.id);
        });
        var span = document.createElement('div');
        span.appendChild(espan);
        span.appendChild(espan1);
        span.appendChild(espan2);
        return span;
    }

    handleDelete = (id) => {
        this.props.dispatch({type: 'DELETE_MERCHANT', id});
    }

    handleStatus = (id) => {
        let obj = {};
        obj.timestamp = new Date() + '';
        obj.old = "Status: " + this.props.merchants[id - 1].status;
        var tempStatus = ''
        if(this.props.merchants[id - 1].status == 'Active') {
            tempStatus = "Inactive";    
        } else {
            tempStatus = "Active";
        }
        obj.new = "Status: " + tempStatus;
        this.setState({
            id,
            name: this.props.merchants[id - 1].name,
            status: tempStatus,
            description: this.props.merchants[id - 1].description,
            history: [...this.props.merchants[id - 1].history, obj]
        })
        this.props.dispatch({
            type: 'UPDATE_MERCHANT_STATUS',
            payload: this.state
        })
    }

    handleRowClick = (e) => {
        this.props.history.push({
            pathname: '/merchantHistory',
            state: {
                history: [...e.data.history],
            }
        });
    }

    render() {
        const columnDefs = [{
            headerName: 'Merchant Name',
            field: 'name',
            filter: true
          }, {
            headerName: 'Description',
            field: 'description',
            autoHeight: true,
            filter: true
          }, {
            headerName: 'Status',
            field: 'status',
            filter: true
          }, {
            headerName: 'Action',
            field: 'id',
            cellRenderer: this.viewCellRendererFunc,
            width: 300,
            autoHeight: true
        }]

        let { merchants } = this.props;

        return (
            <div>
                <div className="container">
                     <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Add Merchant</h5>
                        <div className="input-field">
                          <label className="active" htmlFor="name">Merchant Name</label>
                            <input type="text" id="name" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className="active" htmlFor="description">Description</label>
                            <textarea id="description" className="materialize-textarea" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className="active" htmlFor="status">Status</label>
                            <textarea id="status" className="materialize-textarea" onChange={this.handleChange} />
                        </div>
                       <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Add</button>
                        </div>
                    </form>
                </div>
                <div className="ag-theme-balham" style={{ margin: 'auto', height: '363px', width: '900px' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={merchants}
                        rowHeight='275'
                        rowSelection= {true}
                        onRowClicked= {this.handleRowClick}
                        pagination={true}
                        paginationPageSize='10'>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        merchants: state
    }
}

export default connect(mapStateToProps)(HomePage);