import React, { useState, useEffect } from 'react';

const Komponent = (props) => {
    const [id, setID] = useState(props.data_id);
    const [idKomponentu, setIdKomponentu] = useState(props.id);
    const [nazwaKomponentu, setNazwa] = useState(props.nazwa);
    const [dataDodania, setDataDodania] = useState(props.dataDodania);
    const [poczatkowyCzas, setPoczatkowyczas] = useState(props.poczatkowyCzas);
    const [transformacja, setTransformacja] = useState(props.transformacja);

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

    function updateComponent(e) {
      const el = document.getElementById(`${id}`);
      el.classList.add('loading');
      fetch(`http://justsimply.pl/sba/api/wdrozenie/update_component.php?id=${id}&nazwaKomponentu=${nazwaKomponentu}&dgID=${idKomponentu}&poczatkowyCzas=${poczatkowyCzas}&transformacja=${transformacja}`)
      .then((response) => {
          if (response.status == 503) {
            console.log(`Can't update component ??`);
          } else {
            el.classList.remove('loading');
            console.log(`Component updated`);
          }
        }
      );
    }

    return (
      <tr id={id}>
        <th scope="row"><input className="dgID" type="number" onChange={(e) => handleChange(e.target)} value={idKomponentu} /></th>
        <td><input className="componentName" onBlur={(e) => updateComponent(e)} value={nazwaKomponentu} onChange={(e) => handleChange(e.target)} /></td>
        <td><input className="firstTime" onBlur={(e) => updateComponent(e)}  onChange={(e) => handleChange(e.target)} value={poczatkowyCzas} /></td>
        <td><input className="transformTime" onBlur={(e) => updateComponent(e)}  onChange={(e) => handleChange(e.target)} value={transformacja} /></td>
        <td>
          <button type="button" class="close" aria-label="Close" onClick={(e) => props.deleteFunction(e.target.dataset.id)}>
            <span aria-hidden="true" data-id={id}>&times;</span>
          </button>
        </td>
      </tr>
    );
  }

  export default Komponent;