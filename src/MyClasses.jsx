import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';
import UpdateClsForm from './UpdateClsForm';

const MyClasses = () => {
    const {user} = useContext(CampContext);
    const [clsDt, setClsDt] = useState([]);
    const [count, setCount] = useState(0);
    const [formState, setFormState] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://summer-camp-school-server.onrender.com/classes/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {setClsDt(data); setLoading(false);}
        })
    }, [user, count])

    return (
        <div className='container text-center'>
           <h2>Classes added by you</h2>
            <div className='row'>
            { loading ? <h2>Loading..</h2> : clsDt.map(x => (<div key={x._id} className='col-sm-4'>
            <div className='card p-3 m-4'>
            <img src={x.cImgURL} className='card-img-top' />
            <div className="card-body mt-3">
            <h6 className="card-title mb-3">Class Name: {x.cN}</h6>
            <p  className="card-text">Price : {x.price}</p>
            <p  className="card-text">Available Seats : {x.seats}</p>
            <p  className="card-text">Enrolled : {x.enrolled}</p>
            <p  className="card-text">Status : {x.cStatus}</p>
            {x?.adminFB && <p className="card-text">Feedback : {x?.adminFB}</p>}
            <button type='button' onClick={() => setFormState(true)} className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#${x._id}`}>Update Class</button>
            <div className="modal" id={x._id}>
    <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Class update form</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

     
      <div className="modal-body text-start">
        <UpdateClsForm x={x} setCount={setCount} count={count} formState={formState} setFormState={setFormState} />
      </div>

    
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
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

export default MyClasses;