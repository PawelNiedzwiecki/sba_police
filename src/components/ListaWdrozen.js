import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';

const ListaWdrozen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://justsimply.pl/sba/api/wdrozenie/read.php').then((res) => res.json()).then((result) => setData(result.wdrozenia));
  }, []);
  
  return (
    <div>
      <h2>Lista wdrożeń</h2>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            <Link to={{
              pathname: `/wdrozenie/${item.id}`,
              state: { idWdrozenia: item.id },
            }}
            >
              {item.nazwa}

            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
  }

  export default ListaWdrozen;