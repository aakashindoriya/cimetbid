import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Flex,
  useToast,
  useColorModeValue,
  Image,
  VStack,
  HStack,
  Skeleton,
  Text,
  
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProductById, updateProduct } from '../redux/actions/productAction';
import { uplodeFile } from '../redux/actions/uploadImg';
import { useNavigate, useSearchParams } from 'react-router-dom';

const init = {
  type: '',
  title: '',
  description: '',
  startingPrice: '',
  number: '',
  vehicleType: '',
  address: '',
  details: '',
};

const ProductForm = () => {
  const [formData, setFormData] = useState(init);
  const { selectedProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [urlparams] = useSearchParams();
  const id = urlparams.get("id");
  const [pic, setPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtLcEbK72DdI2-0yjNOHLvzQeJqLRKhirxA&s");
  const [picLoading,setPicLoading]=useState(false)
  const navigate = useNavigate();
  const picref=useRef(null)
  useEffect(() => {
    if (id) {
      if (!selectedProduct || selectedProduct?._id !== id) {
        dispatch(getProductById(id));
      } else {
        setFormData(selectedProduct);
        setPic(selectedProduct.photos[0]);
      }
    }
  }, [selectedProduct, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === selectedProduct?._id) {
      dispatch(updateProduct({ id, updates: { ...formData, photos: [pic] } }))
        navigate("/admin");
    } else {
      dispatch(createProduct({ ...formData, photos: [pic] })).then(() => {
        setFormData(init);
        setPic("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtLcEbK72DdI2-0yjNOHLvzQeJqLRKhirxA&s");
        if (picref.current) {
          picref.current.value = null;
        }
      });
    }
  };

  const formBg = useColorModeValue('white', 'gray.700');

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p="5"
    >
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        width={{ base: '95%', md: '50%' }}
        bg={formBg}
      >
        <Heading mb={4} margin={"auto"} textAlign={"center"}>Product Form</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Product Type</FormLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Select type"
              disabled={selectedProduct?._id === id}
            >
              <option value="property">Property</option>
              <option value="vehicle">Vehicle</option>
            </Select>
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="pic">
            <FormLabel>Upload Picture</FormLabel>
            <HStack>
            <Input
              type="file"
              ref={picref}
              p={1.5}
              accept="image/*"
              onChange={(e) => uplodeFile(e.target.files[0], setPic,setPicLoading)}

            />
            {picLoading?<Text>Loading...</Text>:<Image src={pic}  maxW={"20%"}/>}
            </HStack>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Starting Price</FormLabel>
            <Input
              name="startingPrice"
              type="number"
              value={formData.startingPrice}
              onChange={handleChange}
            />
          </FormControl>

          {formData.type === 'vehicle' && (
            <>
              <FormControl isRequired mb={4}>
                <FormLabel>Vehicle Number</FormLabel>
                <Input
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Vehicle Type</FormLabel>
                <Input
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}

          {formData.type === 'property' && (
            <>
              <FormControl isRequired mb={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}

          <Button mt={4}  bg={'blue.400'}
                  color={'white'}
                  disabled={picLoading}
                  _hover={{
                    bg: 'blue.500',
                   
                  }}  type="submit" w={"full"}>
            {picLoading?"Loading..":"Submit"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ProductForm;
