import React, { useState, useEffect } from 'react';
import Komponent from './Komponent';

const Wdrozenie = (props) => {
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);
  const [liczbaKomponentow, setLiczbaKomponentow] = useState();
  const [idWdrozenia, setID] = useState();
  const [newComponentName, setNewComponentName] = useState();
  const [newComponentDGID, setNewComponentDGID] = useState();
  const [newComponentTime, setNewComponentTime] = useState();
  const [newComponentTransformation, setNewComponentTransformation] = useState();

  useEffect(() => {
    const { wdrozenieID } = props.match.params;
    setID(wdrozenieID);
    fetch(`http://justsimply.pl/sba/api/wdrozenie/item.php?id=${wdrozenieID}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setComponents(result.komponenty);
        setLiczbaKomponentow(result.komponenty.length);
      })
  }, []);

  function addNewComponent() {

      fetch(`http://justsimply.pl/sba/api/wdrozenie/create_component.php?idWdrozenia=${idWdrozenia}&nazwaKomponentu=${newComponentName}&poczatkowyCzas=${newComponentTime}&transformacja=${newComponentTransformation}&dgID=${newComponentDGID}`)
        .then((result) => {
          if(result.status == 503) {
            console.log("nie udało się");
          }else{
            fetch(`http://justsimply.pl/sba/api/wdrozenie/item.php?id=${idWdrozenia}`)
            .then((res) => res.json())
            .then((result) => {
              setData(result);
              setComponents(result.komponenty);
              setLiczbaKomponentow(result.komponenty.length);
              setNewComponentName('');
              setNewComponentDGID('');
              setNewComponentTime('');
              setNewComponentTransformation('');
            }).then(() => {
              console.log({ data });
            });
          }
        }).then((res) =>{

        });
  }

  function deleteComponent(id){
    // console.log(id);
    fetch(`http://justsimply.pl/sba/api/wdrozenie/delete_component.php?id=${id}`)
      .then((response) =>{
        if(response.status == 401){
          // setMessage("Nie udało się usunąć komponentu");
          // setMessageType("danger");
        }else{
          fetch(`http://justsimply.pl/sba/api/wdrozenie/item.php?id=${idWdrozenia}`)
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            setComponents(result.komponenty);
            setLiczbaKomponentow(result.komponenty.length);
            setNewComponentName('');
            setNewComponentDGID('');
            setNewComponentTime('');
            setNewComponentTransformation('');
          }).then(() => {
            console.log({ data });
          });
        }
      })
  }

    return (
      <div>
          <div>Id wdrożenia:{' '}{data.id}</div>
          <div>Data dodania:{' '}{data.dataDodania}</div>
          <div>Nazwa wdrożenia:{' '}{data.nazwa}</div>
          <div>Ilość komponentów:{' '}{liczbaKomponentow}</div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID Komponentu</th>
                <th scope="col">Nazwa</th>
                <th scope="col">Poczatkowy Czas</th>
                <th scope="col">Transformacja</th>
                <th scope="col">Usuń</th>
              </tr>
            </thead>
            <tbody>
              {liczbaKomponentow > 0 ? (
                components.map((item) => <Komponent key={item.id} data_id={item.id} id={item.dgID} nazwa={item.nazwaKomponentu} poczatkowyCzas={item.poczatkowyCzas} transformacja={item.transformacja} deleteFunction={deleteComponent} />)
              ) : (
                <tr><td colspan="4">Brak komponentów</td></tr>
              )
              
              }
            </tbody>
          </table>
          <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addComponent">Dodaj komponent</button>
            
            <div class="modal fade" id="addComponent" tabindex="-1" role="dialog" aria-labelledby="addComponentLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Dodawanie nowego komponentu</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row mb-4">
                      <div class="col-md-12">
                        <label for="componentName">Nazwa komponentu:</label>
                        <input name="componentName" class="form-control" type="text" placeholder="Podaj nazwę komponentu" value={newComponentName} onChange={e => setNewComponentName(e.target.value)}/>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-4">
                        <label for="componentLegacyTime">DG ID:</label>
                        <input name="componentLegacyTime" type="number" placeholder="Wpisz ID komponentu" class="form-control" value={newComponentDGID} onChange={e => setNewComponentDGID(e.target.value)}/>
                      </div>
                      <div class="col-md-4">
                        <label for="componentLegacyTime">Początkowy czas:</label>
                        <input name="componentLegacyTime" type="number" placeholder="Wpisz początkowy czas" class="form-control" value={newComponentTime} onChange={e => setNewComponentTime(e.target.value)}/>
                      </div>
                      <div class="col-md-4">
                        <label for="componentTransformationTime">Czas potrzebny na transformację:</label>
                        <input name="componentTransformationTime" type="number" placeholder="Wpisz czas potrzebny na transformację" class="form-control" value={newComponentTransformation} onChange={e => setNewComponentTransformation(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={addNewComponent}>Dodaj komponent</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    );

  // return (
  //   <div>
  //     <div>Id wdrożenia:{' '}{data.id}</div>
  //     <div>Data dodania:{' '}{data.dataDodania}</div>
  //     <div>Nazwa wdrożenia:{' '}{data.nazwa}</div>
  //     <div>Ilość komponentów:{' '}{liczbaKomponentow}</div>
  //   </div>
  // );
};

export default Wdrozenie;