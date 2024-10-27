// layouts/AdminLayout.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminLayout = () => {
  const {user}=useSelector((s)=>s.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user?.role){
      navigate("/login")
    }
    if(user?.role!=="admin"){
      navigate("/404")
    }
  },[user])
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <Outlet />
    </>
  );
};

export default AdminLayout;
