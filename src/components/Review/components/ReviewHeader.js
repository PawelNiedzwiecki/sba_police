import React, { useState, useEffect } from 'react';

const ReviewHeader = (props) => {

    const [projectID, setProjectID] = useState(props.projectID);
    const [projectName, setProjectName] = useState(props.name);
    const [componentsCount, setComponentsCount] = useState();
    const [estimatedEndTime, setEstimatedEndTime] = useState();

    return (
        <div>
        <h2>{projectName}</h2>
            <div>ID Projektu: {projectID}</div>
            <div>Ilość komponentów: {componentsCount}</div>
            <div>Planowany czas zakończenia: {estimatedEndTime}</div>
        </div>
    )

}

export default ReviewHeader;