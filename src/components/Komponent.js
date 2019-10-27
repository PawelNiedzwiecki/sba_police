import React, { useState, useEffect } from 'react';

const Komponent = (props) => {
    const [id, setID] = useState(props.key);
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
  
  
    return (
      <tr data_id={id}>
        <th scope="row"><input className="dgID" type="number" onChange={(e) => handleChange(e.target)} value={idKomponentu} /></th>
        <td><input className="componentName" value={nazwaKomponentu} onChange={(e) => handleChange(e.target)} /></td>
        <td><input className="firstTime" onChange={(e) => handleChange(e.target)} value={poczatkowyCzas} /></td>
        <td><input className="transformTime" onChange={(e) => handleChange(e.target)} value={transformacja} /></td>
      </tr>
    );
  }

  export default Komponent;