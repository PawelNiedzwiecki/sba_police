import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch, 
} from 'react-router-dom';

const Add = () => {
  let match = useRouteMatch();

  console.log(match);

  return (
  <div className="test">
    <h2>Dodaj wdrozenie</h2>
    <div className="wrapping">
      <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">Nazwa</span>
        </div>
        <input type="text" className="form-control" placeholder="Nazwa wdrozenia" aria-label="ProjectName" aria-describedby="addon-wrapping" />
      </div>
      <div className="input-group flex-nowrap">
        
      </div>
    </div>
  </div>
);
  }

export default Add;
