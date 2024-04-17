import React, { useEffect, useState } from 'react';

const UpdateClsForm = ({x, setCount, count, formState, setFormState}) => {
    

    function updateCourse(event) {
        event.preventDefault();
        const form = event.target;
        const updatedObj  = {
            seats : form.seats.value, price: form.price.value
        };
        
        fetch(`http://localhost:3000/updatethecourse/${form.id.value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                setFormState(false); setCount(count + 1); form.reset();
            }
        })
    }
    if (formState) {
        return (
            <form onSubmit={updateCourse}>
            <div className='mb-3 mt-3'>
            <label>Total seats : </label>
            <input type='number' className='form-control' name='seats' placeholder='update available seats' />
            </div>
            <div className='mb-3 mt-3'>
            <label>Price : </label>
            <input type='number' className='form-control' name='price' placeholder='update price' />
            </div>
            <input type='hidden' name='id' value={x._id} />
            <button type='submit' className='btn btn-outline-dark'>Update</button>
        </form>
        );
    } else {
        return (
            <h4>
                Updated!!
            </h4>
        );
    }
};

export default UpdateClsForm;