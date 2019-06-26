import React from 'react';

const MerchantHistory = ({location}) => {
    const history = location.state.history;
    console.log(history);
    return (
        <div className="project-list section">
            <h5 className="grey-text text-darken-3">Merchant History</h5>
            { history && history.map(hist => {
                return (
                    <div className="card-content black-text text-darken-3" style={{ marginLeft: '30px'}} key={hist}>
                        <p key={hist.old}>Old Data : {hist.old}</p>
                        <p key={hist.new}>Modified Data : {hist.new}</p>
                        <p key={hist.timestamp}>{hist.timestamp}</p>
                        <p>--------------------------------------------------------------------</p>
                    </div>
                )
            })}
        </div>
    )
}

export default MerchantHistory