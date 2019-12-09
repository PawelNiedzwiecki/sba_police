import React, { useState, useEffect } from 'react';
import ReviewHeader from './components/ReviewHeader';
import ReviewTable from './components/ReviewTable';
import {
  Link,
} from 'react-router-dom';
import MessageBox from '../MessageBox';

const ReviewItem = (props) => {

    const [projectID, setProjectID] = useState(props.match.params.wdrozenieID);
    const [data, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(0);

    useEffect(() => {
        console.log('Ładuję info');
        fetch(`http://justsimply.pl/sba/api/wdrozenie/item_review.php?id=${projectID}`)
        .then((res) => res.json()).then((result) => {
            setData(result)
            setIsLoaded(1);
        });
    }, [])

    if (isLoaded == 1) {
    return (
        <div>
            <ReviewHeader name={data.nazwa} projectID={projectID}/>
            { data ? (
                <ReviewTable id={data.id} components={data.komponenty_review}/>
            ) : (
                <ReviewTable />
            )}
        </div>
    )} else {
        return (
            <div>Ładowanie</div>
        )
    }
}


export default ReviewItem;