import React, { useContext } from 'react';
import { CampContext } from '../ContextProvider';

const AddaCls = () => {
    const {user} = useContext(CampContext);
    if (!user) {return <div>Null</div>}
    function addingClass(event) {
        event.preventDefault();
        const form = event.target;
        const cIObj = {
            insID: user.uid,
            insImgURL: user.photoURL,
            cN: form.className.value,
            cImgURL: form.classImgURL.value,
            insName: form.instructor.value,
            insEmail: form.instructorE.value,
            seats: form.seats.value,
            price: form.price.value,
            enrolled: 0,
            cStatus: 'pending'
        };
        
        fetch('https://summer-camp-school-server.onrender.com/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            },
            body: JSON.stringify(cIObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {
                if (data.acknowledged) {alert('class details added!'); form.reset();}
            }
        })
    }
    return (
        <div className='container'>
            <h2 className='text-center'>Add your class</h2>
            <form className='w-75 log-i mx-auto' onSubmit={addingClass}>
                <div className='mb-3 mt-3'>
                <label>Class Name:</label>
                <input type='text' className='form-control' name='className' placeholder='class name' />
                </div>
                <div className='mb-3 mt-3'>
                <label>Image URL:</label>
                <input type='url' className='form-control' name='classImgURL' placeholder='url of class image' />
                </div>
                <div className='mb-3 mt-3'>
                <label>Instructor Name:</label>
                <input type='text' className='form-control' name='instructor' value={user?.displayName} readOnly />
                </div>
                <div className='mb-3 mt-3'>
                <label>Instructor Email:</label>
                <input type='email' className='form-control' name='instructorE' value={user?.email} readOnly />
                </div>
                <div className='mb-3 mt-3'>
                <label>Number of Seats:</label>
                <input type='number' className='form-control' name='seats' placeholder='available seats' />
                </div>
                <div className='mb-3 mt-3'>
                <label>Price:</label>
                <input type='number' className='form-control' name='price' placeholder='price' />
                </div>
                <button type='submit' className='btn btn-outline-dark'>Add</button>
            </form>
        </div>
    );
};

export default AddaCls;