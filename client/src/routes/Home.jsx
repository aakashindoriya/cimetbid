import { Box, SimpleGrid } from "@chakra-ui/react";
import SingleProductCard from "../components/SingleProductCard";
import SkeletonCard from "../skeletons/ProductSkeleton"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((store) => store.product); // Assuming loading state is managed in the Redux store

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box p={4}>
      <SimpleGrid w="full" columns={{ base: 1, md: 3, lg: 4 }} spacing={2}>
        {status==="loading" ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          products.map((product) => (
            <SingleProductCard key={product._id} product={product} />
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
