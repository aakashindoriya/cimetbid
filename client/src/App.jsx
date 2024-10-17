import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import socket from './utils/soket'
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from './redux/slices/productSlice';

const App = () => {
  const [notification,setNotification]=useState([])
  const {user}=useSelector(store=>store.auth)
  const dispatch=useDispatch()
useEffect(()=>{
  if(user){
    socket.emit("login", user._id)
  }
},[user])
useEffect(()=>{
  socket.on("newProduct",(data)=>{
    dispatch(newProduct(data))
  })
  socket.on("newBid",(data)=>{
    setNotification([data,...notification])
  })
},[])
  return (
    <div>
      <Navbar notification={notification} />
      <Outlet />
      <Footer />
      
    </div>
  );
};

export default App;
