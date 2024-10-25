import { Box, SimpleGrid } from "@chakra-ui/react";
import SingleProductCard from "../components/SingleProductCard";
import SkeletonCard from "../skeletons/ProductSkeleton"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/actions/productAction";
import FiltersPagination from "../components/FiltersPagination";
import { Pagination } from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((store) => store.product); 
  let [filters,setFilters]=useState({
    search:"",
    type:""
  })
  function changePage(page){
    dispatch(fetchProducts({...filters,page:page}));
  }
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch]);

  return (
    <Box p={4} m="2">
      <FiltersPagination filters={filters} setFilters={setFilters} />
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
      <Pagination changePage={changePage}/>
    </Box>
  );
};

export default Home;
