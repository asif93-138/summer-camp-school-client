import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import auth from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useGoogleSI from './useSIWG';
import { Link } from 'react-router-dom';
import { CampContext } from '../ContextProvider';

const ISignin = () => {
    const contxtData = useContext(CampContext);
    const [error, setError] = useState('');
    const googleSignIn = useGoogleSI('inst');
    
      const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
        } = useForm();
        
        const onSubmit = (data) => {
  
          signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in 
      setError(''); contxtData.setInstructor(true); reset();
      localStorage.setItem('scs-ins-id', 'user-inst');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      setError(errorMessage);
    });
        };
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
  
        <label htmlFor='email'>Email : </label>
        <input type='email' id='email' placeholder='email' {...register("email", { required: 'this field is required!' })} />
        {/* errors will return when field validation fails  */}
         {errors.email?.message}
         <label htmlFor='password'>Password : </label>
         <input type='password' id='password' placeholder='password' {...register("password", { required: 'this field is required!' })} />
         {errors.password?.message}
          {(error != '') && <p>{error}</p>}
        <button type='submit' className=''>Submit</button>
      </form>
      <p>Or,<br />Sign in with </p><button onClick={() => googleSignIn('inst')} type='button' className=''>Google</button>
      <p>Don't have an account? Please, <Link to="/signup">Register</Link></p>
      </div>
    );
};

export default ISignin;