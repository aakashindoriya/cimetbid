import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser } from './redux/actions/authAction';
import { createProduct, deleteProduct, fetchProducts, getProductById, updateProduct } from './redux/actions/productAction';
import { createBid } from './redux/actions/bidAction';


function App() {
  const dispatch = useDispatch();
const authState = useSelector((state) => state.product);
  
useEffect(()=>{
  // dispatch(loginUser({ username: 'rohit jain', email: 'user@example.com', password: 'password' }));
  // dispatch(logoutUser())
  // dispatch(createProduct({
  //   type: 'vehicle',
  //   title: 'Toyota Corolla 2020',
  //   description: 'A well-maintained car with low mileage',
  //   startingPrice: 1200000,
  //   number: 'AB123CD',
  //   details: 'Silver color, automatic transmission, 20,000 km driven',
  //   vehicleType: 'Sedan'
  // }));
  // dispatch(getProductById("670b944c2440881c3a6b9f0d"));
  // dispatch(updateProduct({
  //   id: '670b944c2440881c3a6b9f0d',
  //   updates: {
  //     title: 'Updated Toyota Corolla 2020',
  //     description: 'New paint job and servicing done',
  //     startingPrice: 1200000,
  //     number: 'XY789ZT',
  //     details: 'White color, automatic transmission, 25,000 km driven',
  //     vehicleType: 'Sedan'
  //   }
  // }));
  dispatch(createBid({
    productId: "670bb07c2440881c3a6b9f17",
    bidData: {
      bidAmount: 5000000,
      bidderName: "John Doe"
    }
  }));
  
},[])
console.log(authState)
  return (
    <>l
      
    </>
  )
}

export default App
