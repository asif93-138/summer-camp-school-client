import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const SelectedCls = () => {
    const {user} = useContext(CampContext);
    const [courses, setCourses] = useState([]);
    const [count, setCount] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:3000/selections/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setCourses(data)}
        })
    }, [user, count])
    function classDeletion(data, p1) {
        fetch(`http://localhost:3000/selections/${data}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                setCount(count + 1);
                if (p1 != 'paid') {
                    alert('class deleted!');
                } else {
                    alert('paid!');
                }
            }
        })
    }
    function coursePayment(cp) {
        fetch(`http://localhost:3000/payments/${cp.course._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cp)
        })
        .then(res => res.json())
        .then(data => {
            if (data.result.acknowledged && data.result1.acknowledged) {
                classDeletion(cp._id, 'paid')
            }
        })
    }
    return (
        <div>
            {courses.map(x => (<div key={x._id}>
                <img src={x.course.cImgURL} />
                <p>Course Name: {x.course.cN}</p>
                <p>Instructor: {x.course.insName}</p>
                <button type='button' onClick={() => coursePayment(x)}>Pay</button><button type='button' onClick={() => classDeletion(x._id)}>Delete</button>
            </div>))}
            <button type='button' onClick={() => {
                console.log('testing');
                fetch('http://localhost:3000/updateTesting', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({cN: 'updated 2'})
                })
                .then(res => res.json())
                .then(data => console.log(data))
            }}>update testing</button>
        </div>
    );
};

export default SelectedCls;