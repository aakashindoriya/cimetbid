import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from './Home';
import ProductDetails from './ProductDetails';
import CreateProduct from './CreateProduct';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'product/:id',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'create-product',
            element: <CreateProduct />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
