import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const Classes = () => {
    const {user, userStatus} = useContext(CampContext);
    const [allClasses, setAllClasses] = useState([]);
    const [btnDis, setBtnDis] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3000/classes')
        .then(res => res.json())
        .then(data => setAllClasses(data))
        if (userStatus == 'admin' || userStatus == 'instructor') {setBtnDis(true)}
    }, [userStatus])
    function courseSelection(data) {
        if (user) {
            const scsObj = {
                course: data,
                student: user.uid
            };
            fetch('http://localhost:3000/selections', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(scsObj)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        } else {
            alert('Please, login first!');
        }
    }
    return (
        <div>
            <p>Classes!</p>
            {allClasses.map(x => {
                if (x.cStatus == 'approved') { return (<div key={x._id}>
                    <img src={x.cImgURL} />
                    <p>Class Name: {x.cN}</p>
                    <p>Instructor: {x.insName}</p>
                    <p>Available seats: {x.seats}</p>
                    <p>Price: {x.price}</p>
                    <button type='button' disabled={btnDis} onClick={() => courseSelection(x)}>Select course</button>
                </div>);}
            })}
        </div>
    );
};

export default Classes;