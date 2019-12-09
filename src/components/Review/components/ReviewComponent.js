import React, { useState, useEffect } from 'react';

const ReviewComponent = (props) => {

    const [id, setID] = useState();
    const [componentName, setComponentName] = useState();
    const [xslt, setXSLT] = useState();
    const [js, setJS] = useState();
    const [details, setDetails] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        setID(props.id);
        setComponentName(props.name);
        setXSLT(props.xslt);
        setJS(props.js);
        setDetails(props.details);
        setComments(props.comments);
    }, [props])

    function handleChange(e) {
        if (e.className === 'componentName') {
          setComponentName(e.value);
        } else if (e.className === 'XSLT') {
          setXSLT(e.value);
        } else if (e.className === 'JS') {
          setJS(e.value);
        } else if (e.className === 'details') {
          setDetails(e.value);
        } else if (e.className === 'comments') {
          setComments(e.value);
        }
      }

    return (
        <tr>
            <td><input className="componentName" onChange={(e) => handleChange(e.target)} value={componentName}/></td>
            <td><input className="XSLT" onChange={(e) => handleChange(e.target)} value={xslt} /></td>
            <td><input className="JS" onChange={(e) => handleChange(e.target)} value={js} /></td>
            <td><input className="details" onChange={(e) => handleChange(e.target)} value={details}/></td>
            <td><textarea className="comments" onChange={(e) => handleChange(e.target)}>{comments}</textarea></td>
            <td>
                <button type="button" class="close" aria-label="Close" onClick={(e) => props.deleteFunction(e.target.dataset.id)}>
                    <span aria-hidden="true" data-id="51">×</span>
                </button>
            </td>
            
        </tr>
    )
}


export default ReviewComponent;