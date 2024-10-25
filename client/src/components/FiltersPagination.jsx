import { Box, Button, HStack, Input, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts } from "../redux/actions/productAction"

const FiltersPagination = ({filters,setFilters}) => {
    const dispatch=useDispatch()
    
    function handleFilterChange(e){
        setFilters({...filters,[e.target.name]:e.target.value})
    }
    function handleSubmit(){
        dispatch(fetchProducts({...filters}))
    }
    
  return (
    <Box mb="2" mt="2"  >
        <HStack justifyContent={"center"} gap={"3"} w="50%">
            <Select maxW="40" name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="property">Property</option>
                <option value="vehicle">Vehicle</option>
            </Select>
            <HStack>
                <Input name="search" placeholder="search..." value={filters.search} onChange={handleFilterChange}/>
            </HStack>
            <Button variant={"outline"} colorScheme="black" onClick={handleSubmit}>Apply</Button>
        </HStack>
    </Box>
  )
}

export default FiltersPagination