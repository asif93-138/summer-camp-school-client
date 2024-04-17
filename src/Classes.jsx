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
    <div className='container'>
                <div className='row'>
            {allClasses.map(x => {
                if (x.cStatus == 'approved') { return (<div key={x._id} style={{
                    backgroundColor: (Number(x.seats) == x.enrolled) ? 'red' : 'initial'
                }} className='col-sm-4'>
                    <div className='card p-3 m-4'>
                    <img src={x.cImgURL} className='card-img-top' />
                    <div className="card-body mt-3 text-center">
                    <h6 className="card-title mb-3">Class Name: {x.cN}</h6>
                    <p className="card-text">Instructor: {x.insName}</p>
                    <p className="card-text">Available seats: {x.seats}</p>
                    <p className="card-text">Price: {x.price}</p>
                    <button type='button' className='btn btn-primary' disabled={(Number(x.seats) == x.enrolled) ?
                    true
                     :
                    btnDis} onClick={() => courseSelection(x)}>Select course</button>
                    </div>
                    </div>
                </div>);}
            })}
        </div>
    </div>
    );
};

export default Classes;