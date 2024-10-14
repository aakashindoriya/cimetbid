import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';


const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <h1>footer</h1>
    </>
  );
};

export default UserLayout;
