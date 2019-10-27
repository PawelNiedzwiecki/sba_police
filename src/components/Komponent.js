import React, { useState, useEffect } from 'react';

const Komponent = (props) => {
    const [id, setID] = useState(props.data_id);
    const [idKomponentu, setIdKomponentu] = useState(props.id);
    const [nazwaKomponentu, setNazwa] = useState(props.nazwa);
    const [dataDodania, setDataDodania] = useState(props.dataDodania);
    const [poczatkowyCzas, setPoczatkowyczas] = useState(props.poczatkowyCzas);
    const [transformacja, setTransformacja] = useState(props.transformacja);
  
    console.log(props);
  
    function handleChange(e) {
      if (e.className === 'dgID') {
        setIdKomponentu(e.value);
      } else if (e.className === 'componentName') {
        setNazwa(e.value);
      } else if (e.className === 'firstTime') {
        setPoczatkowyczas(e.value);
      } else if (e.className === 'transformTime') {
        setTransformacja(e.value);
      }
    }

    function deleteComponent(id){
      fetch(`http://justsimply.pl/sba/api/wdrozenie/delete_component.php?id=${id}`)
        .then((response) =>{
          console.log(response.status);
          if(response.status == 401){
            // setMessage("Nie udało się usunąć komponentu");
            // setMessageType("danger");
          }else{
            // setMessage("Usunięto komponent");
            // setMessageType("success");
            const el = document.getElementById(id);
            el.remove(); // Usuwa div z ID 'div-02'
          }
        })
    }
  
  
    return (
      <tr id={id}>
        <th scope="row"><input className="dgID" type="number" onChange={(e) => handleChange(e.target)} value={idKomponentu} /></th>
        <td><input className="componentName" value={nazwaKomponentu} onChange={(e) => handleChange(e.target)} /></td>
        <td><input className="firstTime" onChange={(e) => handleChange(e.target)} value={poczatkowyCzas} /></td>
        <td><input className="transformTime" onChange={(e) => handleChange(e.target)} value={transformacja} /></td>
        <td>
          <button type="button" class="close" aria-label="Close" onClick={(e) => deleteComponent(e.target.dataset.id)}>
            <span aria-hidden="true" data-id={id}>&times;</span>
          </button>
        </td>
      </tr>
    );
  }

  export default Komponent;