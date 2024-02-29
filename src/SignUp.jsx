import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { useForm } from "react-hook-form"
import auth from '../firebase.config';
import useGoogleSI from './useSIWG';

const SignUp = () => {
    const googleSignIn = useGoogleSI();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = (data) => {
        if (data.password == data.cPassword) {
            console.log(data);
            console.log(JSON.stringify(data));
            createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed up 
    updateProfile(auth.currentUser, {
      displayName: data.userName, photoURL: data.photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(error);
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    // ..
  });

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
      <button type='submit' className=''>Submit</button>
    </form>
    <p>Or,<br />Sign in with </p><button onClick={googleSignIn} type='button' className=''>Google</button>
        </div>
    );
};

export default SignUp;