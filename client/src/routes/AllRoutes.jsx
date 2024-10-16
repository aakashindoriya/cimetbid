import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import CreateProduct from "./CreateProduct";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import NotFound from "./NotFound";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import MyBids from "./MyBids";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "product/:id",
            element: <ProductDetails />,
          },
          {
            path:"my-bids",
            element:<MyBids/>
          }
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index:true,
            element:<Home />
          },
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "product/:id",
            element: <ProductDetails />,
          }
        ],
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
