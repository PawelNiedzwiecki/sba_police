import React, { useState, useEffect } from 'react';
import {
    Link,
  } from 'react-router-dom';
import MessageBox from '../MessageBox';

const ReviewList = (props) => {

    const   [component, setComponents] = useState(),
            [message, setMessage] = useState(),
            [messageType, setMessageType] = useState();

    useEffect(() => {
        fetch('http://justsimply.pl/sba/api/wdrozenie/item_review.php').then((res) => res.json()).then((result) => setComponents(result.wdrozenia));
    }, []);

    function deleteProject(id){
        fetch(`http://justsimply.pl/sba/api/wdrozenie/delete.php?id=${id}`)
          .then((response) =>{
            console.log(response.status);
            fetch('http://justsimply.pl/sba/api/wdrozenie/read.php').then((res) => res.json()).then((result) => setComponents(result.wdrozenia));
            if(response.status == 401){
              setMessage("Nie udało się usunać wdrożenia");
              setMessageType("danger");
            }else{
              setMessage("Usunięto wdrożenie");
              setMessageType("success");
            }
          })
      }


    if (component) {
        return (
            <div>
              <h2 className="mb-4">Lista wdrożeń</h2>
              <ul className="list-group">
                {component.map((item) => (
                  <li key={item.id} data-id={item.id} className="list-group-item">
                    <Link to={{
                      pathname: `/review/${item.id}`,
                      state: { idWdrozenia: item.id },
                    }}
                    >
                      {item.nazwa}
      
                    </Link>
                    <button type="button" class="close" aria-label="Close" onClick={(e) => deleteProject(e.target.dataset.id)}>
                      <span aria-hidden="true" data-id={item.id}>&times;</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
      
          );
    } else {
        return(
            <div>
              <MessageBox message={message} messageType={messageType} />
              <h2 className="mb-4">Lista wdrożeń</h2>
              <ul className="list-group">
                <li className="list-group-item">Brak wdrożeń</li>
              </ul>
            </div>
          );
    }
}

export default ReviewList;
