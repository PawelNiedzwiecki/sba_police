import React from 'react';
import {
  Link,
} from 'react-router-dom';
import OstatnieWdrozenia from './OstatnieWdrozenia';

const Home = () => (
  <div>
    <div className="jumbotron home">
      <h1 className="display-4">Witaj w SBA Police v.0.5</h1>
      <p className="lead">Super narzędzie, którego pozazdrościłby tata.</p>
      <hr className="my-4" />
      <p>Aby dodać wdrożenie naciśnij przycisk znajdujący się poniżej</p>
      <Link to="/add" className="btn btn-primary btn-lg">Dodaj wdrożenie</Link>
    </div>

    <div className="container-fluid">
      <p className="h3 mb-4">Ostatnie 3 wdrożenia</p>
      <OstatnieWdrozenia />
    </div>
  </div>
);

export default Home;
