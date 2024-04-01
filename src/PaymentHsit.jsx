import React, { useContext, useEffect, useState } from 'react';
import { CampContext } from '../ContextProvider';

const PaymentHsit = () => {
    const {user} = useContext(CampContext);
    const [payments, setPayments] = useState([]);
    const [paymentT, setPaymentT] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:3000/enrolled/${user?.uid}`, {
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
                setPayments(arr);
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
        <div>
            <p>Total Payments : {paymentT}</p>
            {payments.map(x => (<div key={x._id}>
                <p>Name: {x.course.cN}</p>
                <p>price : {x.course.price}</p>
                <p>Card number : {x.cardNumber}</p>
            </div>))}
        </div>
    );
};

export default PaymentHsit;