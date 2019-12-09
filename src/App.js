/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ListaWdrozen from './components/ListaWdrozen';
import ReviewList from './components/Review/ReviewList';
import ReviewItem from './components/Review/ReviewItem';
import Wdrozenie from './components/Wdrozenie';
import Home from './components/Home';
import Header from './components/Header';
import Add from './components/Add';
import Temp from './components/Temp';


const App = () => (
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
          <Route exact path="/review">
            <ReviewList />
          </Route>
          <Route path="/review/:wdrozenieID" component={ReviewItem}/>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route path="/wdrozenie/:wdrozenieID" component={Wdrozenie} />
          <Route path="/temp" exact>
            <Temp name="Pawel" age="29" />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);


export default App;
