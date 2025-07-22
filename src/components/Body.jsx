import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux'; // ✅ Corrected line
import { addUser, removeUser } from '../utils/userSlice';


const Body = () => {

  const dispatch = useDispatch()

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])

    useEffect(()=>{

      onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid,displayName,email} = user;
          dispatch(addUser({
            uid:uid,
            displayName:displayName,
            email:email
          }))

      
          // ...
        } else {
          dispatch(removeUser());
        }
      });
    },[])

  return (
    <div>
      
      {/* <Login/>
      <Browse/>  now after setting configuration for router provider we need not it more*/}
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
