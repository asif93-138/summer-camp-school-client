import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const filteredIns = [];
    useEffect(() => {
        axios.get('https://summer-camp-school-server.onrender.com/classes')
        .then(res => {
            setInstructors(res.data);
            setLoading(false);
        })
    }, [])
    instructors.forEach(x => {
        if (filteredIns.find(y => y.insID == x.insID) == undefined) {
            filteredIns.push(x);
        }
    });
    
    return (
        <div className='container text-center'>
            <h2>Our Instructors</h2>
            <p>Instructors from all classes are displayed below.</p>
            { loading ? <h2>Loading..</h2> : <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                {filteredIns.map(x => (<tr key={x._id}>
                <td>{filteredIns.indexOf(x) + 1}</td>
                <td><img src={x.insImgURL} className='ins-tab-img' /></td>
                <td>{x.insName}</td>
                <td>{x.insEmail}</td>
                </tr>))}
                </tbody>
            </table>}

        </div>
    );
};

export default Instructors;