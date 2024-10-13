import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
