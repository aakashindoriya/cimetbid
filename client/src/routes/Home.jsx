import { Box, SimpleGrid } from "@chakra-ui/react";
import SingleProductCard from "../components/SingleProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/actions/productAction";


const Home = () => {
  const dispatch=useDispatch()
  const {products} =useSelector((store)=>store.product)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <Box p={4} >
      <SimpleGrid w="full" columns={{ base: 1, md: 3, lg: 4 }} spacing={2}>
        {products.map((product) => (
          <SingleProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
