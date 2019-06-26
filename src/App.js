import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './HomePage';
import EditMerchant from './EditMerchant'
import MerchantHistory from './MerchantHistory';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/editMerchant' component={EditMerchant} />
          <Route path='/merchantHistory' component={MerchantHistory} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
