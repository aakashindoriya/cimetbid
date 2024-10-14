import React from 'react';
import { Outlet } from 'react-router-dom';
import SingleBidCard from './components/SingleBidCard';



const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
