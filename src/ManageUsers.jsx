import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3000/allusers', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setUsers(data)}
        })
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
        <div className='container text-center'>
            <h2>All Users</h2>
            <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
            {users.map(x => (<tr key={x._id}>
                <td>{users.indexOf(x) + 1}</td>
                <td>{x.name}</td><td>{x.email}</td><td>{x.userStatus}</td>
                <td>{(x.userStatus == 'student') && <button className='btn btn-primary mx-1' onClick={() => createInst(x._id)} type='button'>Make Instructor</button>}
                {(x.userStatus != 'admin') && <button className='btn btn-primary mx-1' onClick={() => createAdmin(x._id)} type='button'>Make Admin</button>}</td>
            </tr>))}
            </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;