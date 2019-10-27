
import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';

const OstatnieWdrozenia = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://justsimply.pl/sba/api/wdrozenie/read.php').then((res) => res.json()).then((result) => setData(result.wdrozenia));

  }, []);

  if(data){
    return (
      <ul className="list-group">
        {
            data.reverse().slice(0, 3).map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={{
                  pathname: `/wdrozenie/${item.id}`,
                  state: { idWdrozenia: item.id },
                }}
                >
                  {item.nazwa}
                </Link>
              </li>
            ))
    }
      </ul>
    );
  }else{
    return(
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">Brak wdrożeń</li>
      </ul>
    );
  }
};

export default OstatnieWdrozenia;
