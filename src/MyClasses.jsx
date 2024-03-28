import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const MyClasses = () => {
    const {user} = useContext(CampContext);
    const [clsDt, setClsDt] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:3000/classes/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setClsDt(data)}
        })
    }, [user, count])
    function updateCourse(event) {
        event.preventDefault();
        const form = event.target;
        const updatedObj  = {
            seats : form.seats.value, price: form.price.value
        };
        
        fetch(`http://localhost:3000/updatethecourse/${form.id.value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                alert('data updated!'); setCount(count + 1); form.reset();
            }
        })
    }
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
            <form onSubmit={updateCourse}>
                <input type='number' name='seats' placeholder='update available seats' />
                <input type='number' name='price' placeholder='update price' />
                <input type='hidden' name='id' value={x._id} />
                <button type='submit'>Update</button>
            </form>
           </div>))}
        </div>
    );
};

export default MyClasses;