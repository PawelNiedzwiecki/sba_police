import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Header = () => (
    <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <Link className="navbar-brand" to="/">SBAPolice v.0.5</Link>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/add">Dodaj wdrożenie</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/list">Lista transformacji</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/review">Code Review</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/temp">Training</Link>
          </li>
        </ul>
      </div>
    </div>
);

  export default Header;