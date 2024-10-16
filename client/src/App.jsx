import React from 'react';
import { Outlet } from 'react-router-dom';
import SingleBidCard from './components/SingleBidCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      
    </div>
  );
};

export default App;
