import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const {user, userStatus} = useContext(CampContext);
    const [allClasses, setAllClasses] = useState([]);
    const [btnDis, setBtnDis] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/classes')
        .then(res => setAllClasses(res.data))
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
            .then(data => {
                if (data.acknowledged) {
                    alert('Class selected!');
                }
            })
        } else {
            alert('Please, login first!'); navigate('/login');
        }
    }
    
    return (
        <div>
            <p>Classes!</p>
            {allClasses.map(x => {
                if (x.cStatus == 'approved') { return (<div key={x._id} style={{
                    backgroundColor: (Number(x.seats) == x.enrolled) ? 'red' : 'initial' 
                }}>
                    <img src={x.cImgURL} />
                    <p>Class Name: {x.cN}</p>
                    <p>Instructor: {x.insName}</p>
                    <p>Available seats: {x.seats}</p>
                    <p>Price: {x.price}</p>
                    <button type='button' disabled={(Number(x.seats) == x.enrolled) ?
                    true
                     :
                    btnDis} onClick={() => courseSelection(x)}>Select course</button>
                </div>);}
            })}
        </div>
    );
};

export default Classes;