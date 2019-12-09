import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch, 
} from 'react-router-dom';
import DatePicker from 'react-date-picker';
import MessageBox from './MessageBox.js';

const Add = () => {
  // let match = useRouteMatch();

  // console.log(match);
  const 
    [date, setDate] = useState(),
    [projectName, setProjectName] = useState(),
    [projectLink, setProjectLink] = useState(""),
    [sbaLink, setSbaLink] = useState(""),
    [isCreating, setIsCreating] = useState(),
    [respCode, setRespCode] = useState(),
    [messageType, setMessageType] = useState(),
    [message, setMessage] = useState(),
    [projectType, setProjectType] = useState('review');

    function createProject(){
      
      if(projectName){
      setIsCreating(1)
      if (date) {
        const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
              month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1,
              year = date.getFullYear();

        const newDate = `${day}.${month}.${year}`;

        let url = `http://justsimply.pl/sba/api/wdrozenie/create.php?nazwa=${projectName}&projectType=${projectType}`;
        if (projectLink) url+= `&linkProjektu=${projectLink}`;
        if (sbaLink) url+= `&linkSBA=${sbaLink}`;
        if (newDate) url+= `&dataZakonczenia=${newDate}`;
      
        fetch(url)
        .then((response) => {
          setRespCode(response.status);
          if(response.status == 400) {
            setMessageType("danger");
            setMessage("Nie udało się dodać wdrożenia");
          }else{
            setMessageType("success");
            setMessage("Dodano wdrożenie");
          }
          response.json();
        })
          .then((resp) => {
            setIsCreating(0);
          })

      }else{
        let url = `http://justsimply.pl/sba/api/wdrozenie/create.php?nazwa=${projectName}&projectType=${projectType}`;
        if (projectLink) url+= `&linkProjektu=${projectLink}`;
        if (sbaLink) url+= `&linkSBA=${sbaLink}`;
        console.log(projectLink.length)
        fetch(url)
          .then((response) => {
            setRespCode(response.status);
            if(response.status == 400) {
              setMessageType("danger");
              setMessage("Nie udało się dodać wdrożenia");
            }else{
              setMessageType("success");
              setMessage("Dodano wdrożenie");
              resetFields();
            }
            response.json();
          })
            .then((resp) => {
              setIsCreating(0);
            })
      }
    }else{
      setMessage("Musisz podać nazwę wdrożenia");
      setMessageType("danger");
    }

    }

    function resetFields(){
      setDate('');
      setProjectName('');
      setProjectLink('');
      setSbaLink('');
      setRespCode('');
      setIsCreating('');
      // setMessage('');
    }

    function changeProjectType(e) {
      setProjectType(e);
    }



  return (
  <div className="AddWrapper">
    <MessageBox message={message} messageType={messageType}/>
    <h2 className="mb-5">Dodaj wdrozenie</h2>
    <div className="wrapping row">
      <div class="form-group col-md-12">
        <label for="exampleFormControlSelect1">Typ wdrożenia</label>
        <select class="form-control" id="exampleFormControlSelect1" onChange={(e) => changeProjectType(e.target.value)}>
          <option value='review'>Code review</option>
          <option value='transformation'>Transformacja</option>
        </select>
      </div>
      <div className="input-group flex-nowrap mb-4 col-md-12">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">Nazwa</span>
        </div>
        <input type="text" className="form-control" placeholder="Nazwa wdrozenia" aria-label="ProjectName" aria-describedby="addon-wrapping" value={projectName} onChange={(e)=> setProjectName(e.target.value)}/>
      </div>
      <div className="input-group flex-nowrap mb-4 col-md-6">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">https://</span>
        </div>
        <input type="text" className="form-control" placeholder="Link projektu" disabled={(projectType == 'review') ? true : false} aria-label="ProjectLink" aria-describedby="addon-wrapping" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
      </div>
      <div className="input-group flex-nowrap mb-4 col-md-6">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">https://</span>
        </div>
        <input type="text" className="form-control" placeholder="Link SBA" disabled={(projectType == 'review') ? true : false} aria-label="SBALink" aria-describedby="addon-wrapping" value={sbaLink} onChange={(e) => setSbaLink(e.target.value)}/>
      </div>
      <div className="input-group flex-nowrap mb-4 col-md-6">
        <label className="d-inline-flex mr-4">Data zakończenia:</label>
        <DatePicker onChange={(data)=>{setDate(data)}} value={date}/>
      </div>
    
      <div className="buttons-wrapper col-md-12">
        <button type="submit" className="btn btn-primary mr-2" onClick={createProject}>Dodaj</button>
        <button type="button" className="btn btn-outline-danger" onClick={resetFields}>Reset</button>
      </div>
    </div>
  </div>
);
  }

export default Add;
