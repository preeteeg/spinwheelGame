import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import Login from '././components/Login/Login';


const Routes = () => (
<BrowserRouter >
<Switch>
    <Route exact path="/" component={Login} />
    <Route path="/Game" component={Game}/>
</Switch>
</BrowserRouter>
);
export default Routes;