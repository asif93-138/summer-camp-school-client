import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const MyClasses = () => {
    const {user} = useContext(CampContext);
    const [clsDt, setClsDt] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/classes/${user?.uid}`)
        .then(res => res.json())
        .then(data => setClsDt(data))
    }, [user])
    return (
        <div>
           <p>my classes</p>
           {clsDt.map(x => (<div key={x._id}>
            <img src={x.cImgURL} />
            <p>Class Name: {x.cN}</p>
            <p>Price : {x.price}</p>
            <p>Available Seats : {x.seats}</p>
            <p>Enrolled : {x.enrolled}</p>
            <p>Status : {x.cStatus}</p>
            {x?.adminFB && <p>Feedback : {x?.adminFB}</p>}
           </div>))}
        </div>
    );
};

export default MyClasses;