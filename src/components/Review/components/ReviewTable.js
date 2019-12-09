import React, { useState, useEffect } from 'react';
import ReviewComponent from './ReviewComponent';

const ReviewTable = (props) => {
    
    const [id, setID] = useState();
    const [components, setComponents] = useState();

    useEffect(() => {
        setID(props.id);
        setComponents(props.components);
    }, [props])

    console.log(components);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>XSLT</th>
                        <th>JS</th>
                        <th>Opis</th>
                        <th>Uwagi</th>
                        <th>Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    { components ? (
                        components.map((item) => (
                            <ReviewComponent id={id} name={item.name} xslt={item.xslt} js={item.js} details={item.details} comments={item.comment} />
                        ))
                    ) : (
                        <div>Test2</div>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ReviewTable;