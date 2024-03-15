import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const SelectedCls = () => {
    const {user} = useContext(CampContext);
    const [courses, setCourses] = useState([]);
    const [count, setCount] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:3000/selections/${user?.uid}`)
        .then(res => res.json())
        .then(data => setCourses(data))
    }, [user, count])
    function classDeletion(data) {
        fetch(`http://localhost:3000/selections/${data}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                alert('class deleted!');
                setCount(count + 1);
            }
        })
    }
    function coursePayment(cp) {
        fetch('http://localhost:3000/payments', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cp)
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
                    body: JSON.stringify({cN: 'updated'})
                })
                .then(res => res.json())
                .then(data => console.log(data))
            }}>update testing</button>
        </div>
    );
};

export default SelectedCls;