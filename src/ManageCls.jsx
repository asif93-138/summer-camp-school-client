import React, { useEffect, useState } from 'react';

const ManageCls = () => {
    const [classes, setClasses] = useState([]);
    const [count, setCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3000/classes', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setClasses(data)}
        })
    }, [count])
    function statusUpdate(pm, p1) {
        let updatedObj;
        if (p1 == 'ap') {updatedObj = {cStatus: 'approved'}}
        else if (p1 == 'dn') {updatedObj = {cStatus: 'denied'}}
        fetch(`http://localhost:3000/adcourseupdate/${pm}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {alert('status updated'); setCount(count + 1);}
        })
    }
    function adminFeedback(event) {
        event.preventDefault();
        let updatedObj = {adminFB: event.target.fb.value};
        fetch(`http://localhost:3000/adcourseupdate/${event.target.id.value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {setShowFeedback(false)}
        })
    }
    return (
        <div className='container text-center'>
            <h2>Manage your classes</h2>
            <div className='row'>
            {classes.map(x => (<div key={x._id} className='col-sm-4'>
            <div className='card p-3 m-4'>
                <img src={x.cImgURL} className='card-img-top' />
                <div className="card-body mt-3 text-center">
                <h6 className="card-title mb-3">Class Name : {x.cN}</h6>
                <p className="card-text">Instructor : {x.insName}</p>
                <p className="card-text">Instructor Email : {x.insEmail}</p>
                <p className="card-text">Seats : {x.seats}</p>
                <p className="card-text">Price : {x.price}</p>
                <p><button type='button' className='mx-1 btn btn-primary' disabled={(x.cStatus == 'pending') ? false : true} onClick={() => statusUpdate(x._id, 'ap')}>Approve</button><button className='mx-1 btn btn-primary' type='button' disabled={(x.cStatus == 'pending') ? false : true} onClick={() => statusUpdate(x._id, 'dn')}>Deny</button></p>
                {(x.cStatus == 'denied') &&  <button type='button' data-bs-toggle="modal" data-bs-target={`#${x._id}`} onClick={() => setShowFeedback(true)} className='btn btn-primary'>Feedback</button>}
                <div className="modal fade" id={x._id}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Admin Feedback</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setCount(count + 1)}></button>
      </div>
      <div className="modal-body">
        {showFeedback ? 
        <form onSubmit={adminFeedback}>
        <input type='text' name='fb' className='form-control' />
        <input type='hidden' name='id' value={x._id} className='form-control' />
        <button type='submit' className='btn btn-primary'>Submit</button> 
        </form>
        : <h4>Updated!!</h4>
        }
        </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setCount(count + 1)}>Close</button>
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

export default ManageCls;