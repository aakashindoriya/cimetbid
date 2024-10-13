import React from 'react';
import { Outlet } from 'react-router-dom';
import SingleBidCard from './components/SingleBidCard';
const bid={
  "product": "6512d4f093f1f0bde1f7a67c",
  "user": {
    "name": "John Doe",
    "_id": "6512d4f093f1f0bde1f7a67b"
  },
  "amount": 550000,
  "status": "pending",
  "createdAt": "2024-10-10T10:00:00.000Z"
}


const App = () => {
  return (
    <div>
      <SingleBidCard bid={bid} />
      <Outlet />
    </div>
  );
};

export default App;
