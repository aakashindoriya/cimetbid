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
