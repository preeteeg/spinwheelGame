import React, { useRef, useState, useEffect} from 'react';
import { Jumbotron, Row, Container, Col, Button } from 'react-bootstrap';
import Login from './components/Login/Login'
import Home from './components/Home'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';

class App extends React.Component
{

  render()
  {

    return (
      <div className="container">
        <div className="row">
       <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home}/>
        </Switch>
        </BrowserRouter>

        </div>
      </div>
    );
  }
}
export default App;
