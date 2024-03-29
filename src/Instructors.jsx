import React, { useEffect, useState } from 'react';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const filteredIns = [];
    useEffect(() => {
        fetch('http://localhost:3000/classes')
        .then(res => res.json())
        .then(data => setInstructors(data))
    }, [])
    instructors.forEach(x => {
        if (filteredIns.find(y => y.insID == x.insID) == undefined) {
            filteredIns.push(x);
        }
    });
    
    return (
        <div>
            Instructors
            {filteredIns.map(x => (<div key={x._id}>
                <img src={x.insImgURL} />
                <p>Name : {x.insName}</p>
                <p>Email : {x.insEmail}</p>
            </div>))}
        </div>
    );
};

export default Instructors;