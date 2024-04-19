import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const EnrolledClss = () => {
    const {user} = useContext(CampContext);
    const [enrolled, setEnrolled] = useState([]);
    useEffect(() => {
        fetch(`https://summer-camp-school-server.onrender.com/enrolled/${user?.uid}`, {
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
        <div className='container text-center'>
            <h2>Classes you have enrolled</h2>
            <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Class Name</th>
                    <th>Instructor</th>
                  </tr>
                </thead>
                <tbody>
            {enrolled.map(x => (<tr key={x._id}>
                <td>{enrolled.indexOf(x) + 1}</td>
                <td><img src={x.course.cImgURL} className='ins-tab-img' /></td>
                <td>{x.course.cN}</td>
                <td>{x.course.insName}</td>
            </tr>))}
            </tbody>
            </table>
        </div>
    );
};

export default EnrolledClss;