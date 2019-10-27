/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/list">
              <ListaWdrozen />
            </Route>
            <Route path="/wdrozenie/:wdrozenieID" component={Wdrozenie} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Header() {
  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <Link className="navbar-brand" to="/">SBAPolice v.0.5</Link>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/add">Dodaj wdrożenie</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/list">Lista wdrożeń</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Home() {
  return (
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
}

function OstatnieWdrozenia() {
  const [data, setData] = useState([]);

  // function fetchData() {
  //   fetch("http://justsimply.pl/sba/api/wdrozenie/read.php").then(res => res.json()).then((result) => setData(result.wdrozenia))
  // }

  useEffect(() => {
    fetch('http://justsimply.pl/sba/api/wdrozenie/read.php').then((res) => res.json()).then((result) => setData(result.wdrozenia));
  }, []);


  return (
    <ul className="list-group">
      {
        data.slice(0, 3).map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={{
              pathname: '/wdrozenie',
              search: `/${item.id}`,
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
}

function ListaWdrozen() {
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

function Wdrozenie(props) {
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);
  const [liczbaKomponentow, setLiczbaKomponentow] = useState();
  const [idWdrozenia, setID] = useState();

  // if(typeof(data.komponenty) != "undefined"){
  //   const liczbaWdrozen = data.komponenty.length
  // }else{
  //   const liczbaWdrozen = 0;
  // }


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
}

function Komponent(props) {
  const [id, setID] = useState(props.key);
  const [idKomponentu, setIdKomponentu] = useState(props.id);
  const [nazwaKomponentu, setNazwa] = useState(props.nazwa);
  const [dataDodania, setDataDodania] = useState(props.dataDodania);
  const [poczatkowyCzas, setPoczatkowyczas] = useState(props.poczatkowyCzas);
  const [transformacja, setTransformacja] = useState(props.transformacja);

  // console.log(props)
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

export default App;
