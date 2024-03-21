import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3000/allusers')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [count])
    function createInst(id) {
        fetch(`http://localhost:3000/userstatus/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({userStatus : 'instructor'})
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {alert('status updated'); setCount(count + 1)}
        })
    }
    function createAdmin(id) {
        fetch(`http://localhost:3000/userstatus/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({userStatus : 'admin'})
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {alert('status updated'); setCount(count + 1)}
        })
    }
    return (
        <div>
            All Users
            {users.map(x => (<p key={x._id}>
                Name : {x.name} Email : {x.email} status : {x.userStatus}
                {(x.userStatus == 'student') && <button onClick={() => createInst(x._id)} type='button'>Make Instructor</button>}
                {(x.userStatus != 'admin') && <button onClick={() => createAdmin(x._id)} type='button'>Make Admin</button>}
            </p>))}
        </div>
    );
};

export default ManageUsers;