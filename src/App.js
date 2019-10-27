/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ListaWdrozen from './components/ListaWdrozen';
import Wdrozenie from './components/Wdrozenie';
import Home from './components/Home';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/list">
              <ListaWdrozen />
            </Route>
            <Route path="/wdrozenie/:wdrozenieID" component={Wdrozenie} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}


export default App;
