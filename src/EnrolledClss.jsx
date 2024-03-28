import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const EnrolledClss = () => {
    const {user} = useContext(CampContext);
    const [enrolled, setEnrolled] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/enrolled/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setEnrolled(data)}
        })
    }, [user])
    return (
        <div>
            {enrolled.map(x => (<div key={x._id}>
                <p>Course Name : {x.course.cN}</p>
            </div>))}
        </div>
    );
};

export default EnrolledClss;