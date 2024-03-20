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
        
        fetch('http://localhost:3000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cIObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {alert('class details added!'); form.reset();}
        })
    }
    return (
        <div>
            Add a class
            <form onSubmit={addingClass}>
                <input type='text' name='className' placeholder='class name' />
                <input type='url' name='classImgURL' placeholder='url of class image' />
                <input type='text' name='instructor' value={user?.displayName} readOnly />
                <input type='email' name='instructorE' value={user?.email} readOnly />
                <input type='number' name='seats' placeholder='available seats' />
                <input type='number' name='price' placeholder='price' />
                <button type='submit'>Add</button>
            </form>
        </div>
    );
};

export default AddaCls;