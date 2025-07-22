import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isSignIn,setIsSignIn] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);



  const toggleSignIn = ()=>{
      setIsSignIn(!isSignIn);
  }

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async ()=>{
  const nameValue = !isSignIn?name.current.value:null
  console.log(email.current.value);
  console.log(password.current.value);


 


   const result =  checkValidData(email.current.value,password.current.value,nameValue);
  


  // console.log(result);
 

  if (result) {
    setErrorMessage(result);
    return;
  }
  setErrorMessage(null);

  if(!isSignIn){
    //SignUp logic
    createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      
      navigate("/browse")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      setErrorMessage(errorCode +"-"+ errorMessage)
    });
  }else{
    //SignIn logic

       //api call
       try {
        const res = await fetch('https://localhost:7229/api/Account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
        });
      
        const responseBody = await res.text(); // even if it's JSON, reading as text avoids crash on non-JSON responses
      
        if (res.ok) {
          console.log("User found:", responseBody);
          navigate("/browse");
        } else {
          console.warn("Login failed", res.status, responseBody);
          setErrorMessage("Login failed: " + responseBody);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Unable to connect to the server.");
      }
      

  }
  

  }

  return (
    <div className='w-screen'>
      {/* Main content with background */}
      <div className='relative min-h-screen'>
        <Header />

        {/* Background Image */}
        <img
          className='absolute top-0 left-0 w-full h-full object-cover z-[-2]'
          alt="bg-img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/IN-en-20250714-TRIFECTA-perspective_5acb7337-c372-45ec-ae12-ddb110e6ad78_large.jpg"
        />

        {/* Optional dark overlay */}
        <div className='absolute inset-0 bg-black/60 z-[-1]'></div>

        {/* Form Container */}
        <div className='flex justify-center pt-20 pb-10'>
          <form onSubmit={(e)=>e.preventDefault()} className='w-[400px] max-w-[90%] flex flex-col bg-black/70 p-12 text-white'>
            <h1 className='font-extrabold text-3xl py-4'>{isSignIn?"Sign In":"Sign Up"}</h1>
            {!isSignIn && <input
            ref={name}
              type='text'
              placeholder='Enter name'
              className='p-2 py-4 m-2 border border-white text-white bg-neutral-800/40 rounded-sm'
            />}
            <input
            ref={email}
              type='text'
              placeholder='Email'
              className='p-2 py-4 m-2 border border-white text-white bg-neutral-800/40 rounded-sm'
            />
            <input
            ref={password}
              type='password'
              placeholder='Password'
              className='p-2 py-4 m-2 border border-white text-white bg-neutral-800/40 rounded-sm'
            />
            <p className='font-bold text-red-500 p-2 m-2'>{errorMessage}</p>
            <button onClick={handleButtonClick} className='p-2 m-2 bg-red-600 font-bold cursor-pointer'>{isSignIn?"Sign In":"Sign Up"}</button>
           {isSignIn && (
              <>
                <p className='mx-auto text-gray-400 mt-3 mb-3'>OR</p>
                <button className='bg-gray-400/40 p-2 m-2 font-bold'>
                  Use a sign-in code
                </button>
              </>
            )}

            <p className='mx-auto font-bold mt-2'>{isSignIn && "Forgot Password?"}</p>

            <div className='flex items-center text-center'>
              <input className='w-4 h-4 m-2 bg-black' type='checkbox' />
              <label className='ml-1 text-[1.1rem]'>{isSignIn?"Remember me":"I accept Terms and Conditions"}</label>
            </div>

            <div className='flex m-2'>
              <p className='text-neutral-400 text-[1.1rem]'> {isSignIn?"New to Netflix?":"Already Registered?"}</p>
              <p className='font-bold text-[1.1rem] ml-1 cursor-pointer hover:underline hover:underline-offset-2' onClick={toggleSignIn}>{isSignIn?"Sign up.":"Sign In."}</p>
            </div>

            <p className='m-2 text-neutral-400 text-[0.8rem] tracking-normal'>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>

            <div className='m-2'>
              {!expanded ? (
                <div
                  onClick={() => setExpanded(true)}
                  className='text-blue-400 underline underline-offset-2 cursor-pointer text-[0.8rem] tracking-normal'
                >
                  Learn more
                </div>
              ) : (
                <div className='text-neutral-400 text-[0.8rem] tracking-normal'>
                  The information collected by Google reCAPTCHA is subject to the Google
                  Privacy Policy and Terms of Service, and is used for providing,
                  maintaining, and improving the reCAPTCHA service and for general security
                  purposes (it is not used for personalised advertising by Google).
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer - outside background */}
      <footer className='bg-gray-900 text-white text-center p-4'>
        <p>Netflix Clone &copy; 2025. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
