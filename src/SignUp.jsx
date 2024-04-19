import {
  createUserWithEmailAndPassword, updateProfile,GoogleAuthProvider, signInWithPopup 
  } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import auth from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [fbError, setFBError] = useState('');
  
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
              const userObj = {id: user.uid, name: user.displayName, email: user.email};
              fetch(`https://summer-camp-school-server.onrender.com/user/${user.uid}`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(userObj)
              })
              .then(res => res.json())
              .then(resData => localStorage.setItem('scs-access-token', resData.token))
              reset();
              setFBError('');
              navigate('/');
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
      function smLI() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const userObj = {id: user.uid, name: user.displayName, email: user.email};
                fetch(`https://summer-camp-school-server.onrender.com/user/${user.uid}`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(userObj)
                })
                .then(res => res.json())
                .then(resData => localStorage.setItem('scs-access-token', resData.token))
                navigate('/');
  
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
      }
    return (
        <div className='container'>
          <h2 className='text-center'>Sign Up</h2>
    <form className='w-75 mx-auto' onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div className='mb-3 mt-3'>
      <label htmlFor='userName'>Name : </label>
      <input type='text' className='form-control' id='userName' placeholder='name' {...register("userName")} />
        {errors.userName?.message}
        </div>
      {/* include validation with required or other standard HTML validation rules */}
      <div className='mb-3 mt-3'>
      <label htmlFor='email'>Email : </label>
      <input type='email' className='form-control' id='email' placeholder='email' {...register("email", { required: 'this field is required!' })} />
      {/* errors will return when field validation fails  */}
       {errors.email?.message}
       </div>
       <div className='mb-3 mt-3'>
       <label htmlFor='password'>Password : </label>
       <input type='password' className='form-control' id='password' placeholder='password' {...register("password", { required: 'this field is required!' })} />
       {errors.password?.message}
       </div>
       <div className='mb-3 mt-3'>
       <label htmlFor='cPassword'>Confirm Password : </label>
       <input type='password' className='form-control' id='cPassword' placeholder='confirm password' {...register("cPassword", { required: 'this field is required!' })} />
       {errors.cPassword?.message}
       </div>
       <div className='mb-3 mt-3'>
       <label htmlFor='photoURL'>Photo URL : </label>
       <input type='url'  className='form-control' id='photoURL' placeholder='photo url' {...register("photoURL")} />
       {errors.photoURL?.message}
       </div>
       {error && <p>Password must be 6 characters, must have a capital letter and a special character.</p>}
       {(fbError != '') && <p>{error}</p>}
      <button type='submit' className='btn btn-outline-dark'>Submit</button>
    </form>
      <div className='w-75 mx-auto text-center'>
      <p>Or,<br />Sign in with </p><button onClick={smLI} type='button' className='btn btn-outline-dark'>Google</button>
      </div>
        </div>
    );
};

export default SignUp;