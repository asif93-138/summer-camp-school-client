import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const SelectedCls = () => {
    const {user} = useContext(CampContext);
    const [courses, setCourses] = useState([]);
    const [count, setCount] = useState(1);
    const [formState, setFormState] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:3000/selections/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setCourses(data)}
        })
    }, [user, count])
    function classDeletion(data, p1) {
        fetch(`http://localhost:3000/selections/${data}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                setCount(count + 1);
                if (p1 != 'paid') {
                    alert('class deleted!');
                }
            }
        })
    }

    function coursePayment(event) {
            event.preventDefault();
            const dataObj = JSON.parse(event.target.dataObj.value);
            dataObj.cardNumber = event.target.cardNumber.value;

            fetch(`http://localhost:3000/payments/${dataObj.course._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(res => res.json())
            .then(data => {
                if (data.result.acknowledged && data.result1.acknowledged) {
                    event.target.reset();
                    setFormState(false);
                }
            })
        
    }

    return (
        <div className='container text-center'>
            <p><b>Classes you have selected will appear here!</b></p>
            <div className='row'>
            {courses.map(x => (<div key={x._id} className='col-sm-4'>
            <div className='card p-3 m-4'>
                <img src={x.course.cImgURL} className='card-img-top' />
                <div className="card-body mt-3 text-center">
                <h6 className="card-title mb-3">Course Name: {x.course.cN}</h6>
                <p className="card-text">Instructor: {x.course.insName}</p>
                <button onClick={() => setFormState(true)} type='button' className='btn btn-primary mx-1' data-bs-toggle="modal" data-bs-target={`#${x._id}`}>Pay</button><button type='button' className='btn btn-primary mx-1' onClick={() => classDeletion(x._id)}>Delete</button>
                <div className="modal fade" id={x._id}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Payment</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => classDeletion(x._id, 'paid')}></button>
      </div>
      <div className="modal-body">
        {formState ? 
                <form onSubmit={coursePayment}>
                    <div>
                    <label>Enter your card number : </label>
                    <input type='text' name='cardNumber' className='form-control' required />
                    <input type='hidden' name='dataObj' value={JSON.stringify(x)} />
                    </div>
                    <button type='submit' className='btn btn-outline-dark'>Submit</button>
                </form>
                :
                <h4>Paid!!</h4>
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => classDeletion(x._id, 'paid')}>Close</button>
      </div>
    </div>
  </div>
</div>
            </div>
            </div>
            </div>))}
            </div>
        </div>
    );
};

export default SelectedCls;