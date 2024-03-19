import React, { useEffect, useState } from 'react';

const ManageCls = () => {
    const [classes, setClasses] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3000/classes')
        .then(res => res.json())
        .then(data => setClasses(data))
    }, [count])
    function statusUpdate(pm, p1) {
        let updatedObj;
        if (p1 == 'ap') {updatedObj = {cStatus: 'approved'}}
        else if (p1 == 'dn') {updatedObj = {cStatus: 'denied'}}
        else {updatedObj = {adminFB: document.getElementById('feedBack').value}}
        fetch(`http://localhost:3000/adcourseupdate/${pm}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {alert('data updated'); setCount(count + 1);}
        })
    }
    return (
        <div>
            Manage classes
            {classes.map(x => (<div key={x._id}>
                <img src={x.cImgURL} />
                <p>Class Name : {x.cN}</p>
                <p>Instructor : {x.insName}</p>
                <p>Instructor Email : {x.insEmail}</p>
                <p>Instructor : {x.insName}</p>
                <p>Seats : {x.seats}</p>
                <p>Price : {x.price}</p>
                <p><button type='button' disabled={(x.cStatus == 'pending') ? false : true} onClick={() => statusUpdate(x._id, 'ap')}>Approve</button><button type='button' disabled={(x.cStatus == 'pending') ? false : true} onClick={() => statusUpdate(x._id, 'dn')}>Deny</button></p>
                <div>
                    <input type='text' id='feedBack' /><button type='submit' onClick={() => statusUpdate(x._id)}>Feed Back</button>
                </div>
            </div>))}
        </div>
    );
};

export default ManageCls;