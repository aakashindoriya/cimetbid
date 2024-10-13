import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser } from './redux/actions/authAction';


function App() {
  const dispatch = useDispatch();
const authState = useSelector((state) => state.auth);
  
useEffect(()=>{
  // dispatch(loginUser({ username: 'rohit jain', email: 'user@example.com', password: 'password' }));
  dispatch(logoutUser())
},[])
console.log(authState)
  return (
    <>
      
    </>
  )
}

export default App
