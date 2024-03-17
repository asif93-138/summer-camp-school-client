import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import auth from '../firebase.config';
import useGoogleSI from './useSIWG';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [error, setError] = useState(false);
    const [fbError, setFBError] = useState('');
    const googleSignIn = useGoogleSI();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = (data) => {
        if (data.password == data.cPassword) {

        const passTest1 = Boolean(data.password.length > 5);
        const passTest2 = Boolean(/[A-Z]/.test(data.password));
        const scTest = data.password.replace(/([A-Z]|[a-z]|[0-9])/g, "X");
        const passTest3 = Boolean(/[^X]/.test(scTest));
        if (passTest1 && passTest2 && passTest3) {
          setError(false);
          createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed up 
            updateProfile(auth.currentUser, {
              displayName: data.userName, photoURL: data.photoURL
            }).then(() => {
              // Profile updated!
              const user = userCredential.user;
              fetch(`http://localhost:3000/user/${user.uid}`, {
                method: 'POST'
              })
              reset();
              setFBError('');
              // ...
            }).catch((error) => {
              // An error occurred
              setFBError(error);
            });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setFBError(error);
            // ..
          });
          
        } else {setError(true);}

        } else {alert("password didn't match")}
      };
    
    return (
        <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor='userName'>Name : </label>
      <input type='text' id='userName' placeholder='name' {...register("userName")} />
        {errors.userName?.message}
      {/* include validation with required or other standard HTML validation rules */}
      <label htmlFor='email'>Email : </label>
      <input type='email' id='email' placeholder='email' {...register("email", { required: 'this field is required!' })} />
      {/* errors will return when field validation fails  */}
       {errors.email?.message}
       <label htmlFor='password'>Password : </label>
       <input type='password' id='password' placeholder='password' {...register("password", { required: 'this field is required!' })} />
       {errors.password?.message}
       <label htmlFor='cPassword'>Confirm Password : </label>
       <input type='password' id='cPassword' placeholder='confirm password' {...register("cPassword", { required: 'this field is required!' })} />
       {errors.cPassword?.message}
       <label htmlFor='photoURL'>Photo URL : </label>
       <input type='url' id='photoURL' placeholder='photo url' {...register("photoURL")} />
       {errors.photoURL?.message}
       {error && <p>Password must be 6 characters, must have a capital letter and a special character.</p>}
       {(fbError != '') && <p>{error}</p>}
      <button type='submit' className=''>Submit</button>
    </form>
    <p>Or,<br />Sign in with </p><button onClick={googleSignIn} type='button' className=''>Google</button>
        </div>
    );
};

export default SignUp;