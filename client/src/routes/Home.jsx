import { Box, SimpleGrid } from "@chakra-ui/react";
import SingleProductCard from "../components/SingleProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/actions/productAction";
// const products = [
//   {
//     id: 1,
//     title: "Beautiful House",
//     photos: ["https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D"],
//     status: "available",
//     type: "property",
//     address: "123 Main St, Springfield",
//     description: "A beautiful house in a quiet neighborhood.",
//     startingPrice: 300000,
//   },
//   {
//     id: 2,
//     title: "Luxury Car",
//     photos: ["https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyfGVufDB8fDB8fHww"],
//     status: "available",
//     type: "vehicle",
//     vehicleType: "Sedan",
//     number: "ABC-123",
//     description: "A luxury sedan with all the features.",
//     startingPrice: 25000,
//   },
// ];
const Home = () => {
  const dispatch=useDispatch()
  const {products} =useSelector((store)=>store.product)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <Box p={4}>
      <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
        {products.map((product) => (
          <SingleProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
