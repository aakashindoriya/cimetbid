import { Outlet } from 'react-router-dom';


const UserLayout = () => {
  return (
    <>
      <h1>navbar</h1>
      <Outlet />
      <h1>footer</h1>
    </>
  );
};

export default UserLayout;
