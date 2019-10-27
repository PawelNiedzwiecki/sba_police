import React, { useState, useEffect } from 'react';
import Komponent from './Komponent';

const Wdrozenie = (props) => {
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);
  const [liczbaKomponentow, setLiczbaKomponentow] = useState();
  const [idWdrozenia, setID] = useState();

  useEffect(() => {
    console.log(`Data:${data.length}`);
    const { wdrozenieID } = props.match.params;
    fetch(`http://justsimply.pl/sba/api/wdrozenie/item.php?id=${wdrozenieID}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setComponents(result.komponenty);
        setLiczbaKomponentow(result.komponenty.length);
      }).then(() => {
        console.log({ data });
      });
  }, []);

  function addNewComponent() {
    const newtable = [...components];
    const template = {
      id: '', nazwaKomponentu: '', dgID: '', poczatkowyCzas: '', transformacja: '',
    };
    newtable.push(template);
    setComponents(newtable);
  }

  if (liczbaKomponentow > 0) {
    return (
      <div>
          <div>Id wdrożenia:{' '}{data.id}</div>
          <div>Data dodania:{' '}{data.dataDodania}</div>
          <div>Nazwa wdrożenia:{' '}{data.nazwa}</div>
          <div>Ilość komponentów:{' '}{liczbaKomponentow}</div>
          <button onClick={() => addNewComponent()}>Add</button>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID Komponentu</th>
                <th scope="col">Nazwa</th>
                <th scope="col">Poczatkowy Czas</th>
                <th scope="col">Transformacja</th>
              </tr>
            </thead>
            <tbody>
              {components.map((item) => <Komponent key={item.id} id={item.dgID} nazwa={item.nazwaKomponentu} poczatkowyCzas={item.poczatkowyCzas} transformacja={item.transformacja} />)}
            </tbody>
          </table>
        </div>
    );
  }
  return (
    <div>
        <div>
  Id wdrożenia:
          {' '}
          {data.id}
        </div>
        <div>
  Data dodania:
          {' '}
          {data.dataDodania}
        </div>
        <div>
  Nazwa wdrożenia:
          {' '}
          {data.nazwa}
        </div>
        <div>
  Ilość komponentów:
          {' '}
          {liczbaKomponentow}
        </div>
      </div>
  );
};

export default Wdrozenie;