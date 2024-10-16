// layouts/AdminLayout.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

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
      <Outlet />
    </>
  );
};

export default AdminLayout;
