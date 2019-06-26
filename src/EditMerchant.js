import React, { Component } from 'react'
import { connect } from 'react-redux'

class EditMerchant extends Component {
    state = {
        id: this.props.merchant[this.props.location.state.id - 1].id,
        name: this.props.merchant[this.props.location.state.id - 1].name,
        description: this.props.merchant[this.props.location.state.id - 1].description,
        status: this.props.merchant[this.props.location.state.id - 1].status,
        history: this.props.merchant[this.props.location.state.id - 1].history
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {};
        obj.timestamp = new Date() + '';
        obj.old = 'Name: ' + this.state.name + ', Description: ' + this.state.description;
        obj.new = 'Name: ' + this.getName.value + ', Description: ' + this.getDesc.value;
        this.setState({
            name: this.getName.value,
            description: this.getDesc.value,
            history: [...this.state.history, obj]
        })
        setTimeout(() => {
            this.props.dispatch({
                type: 'UPDATE_MERCHANT_DATA',
                payload: this.state
            })
            this.props.history.push('/');
        }, 1000);
    }

    render() {
        const id = this.props.location.state.id - 1;
        const merchantData = this.props.merchant[id];
        console.log('Data : ', merchantData);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Merchant</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="name">Merchant Name</label>
                        <input type="text" id="name" defaultValue={merchantData.name} ref={(input) => this.getName = input} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="description">Description</label>
                        <textarea id="description" className="materialize-textarea"  defaultValue={merchantData.description} ref={(input) => this.getDesc = input} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        merchant: state
    }
}

export default connect(mapStateToProps)(EditMerchant)