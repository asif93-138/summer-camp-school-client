import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const PaymentHsit = () => {
    const {user} = useContext(CampContext);
    const [payments, setPayments] = useState([]);
    const [paymentT, setPaymentT] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://summer-camp-school-server.onrender.com/enrolled/${user?.uid}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {alert(data.message);}
            else {
                const arr = [];
                data.forEach(x => arr.unshift(x));
                setPayments(arr); setLoading(false);
            }
        })
    }, [user])
    useEffect(() => {
        if (user) {
            let totalP = 0;
            payments.forEach(x => totalP += Number(x.course.price))
            setPaymentT(totalP);
        }
    }, [user, payments])
   
    return (
        <div className='container text-center'>
            <h2>Your payment history</h2>
            <h4>Total Payments : {paymentT}</h4>
            { loading ? <h2>Loading..</h2> : <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Card number</th>
                  </tr>
                </thead>
                <tbody>
            {payments.map(x => (<tr key={x._id}>
                <td>{payments.indexOf(x) + 1}</td>
                <td>{x.course.cN}</td>
                <td>{x.course.price}</td>
                <td>{x.cardNumber}</td>
            </tr>))}
            </tbody>
            </table>}

        </div>
    );
};

export default PaymentHsit;