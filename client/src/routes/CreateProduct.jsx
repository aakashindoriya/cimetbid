import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/actions/productAction';
import { uplodeFile } from '../redux/actions/uploadImg';
const init={
type: '',
title: '',
description: '',
startingPrice: '',
status: 'available',
number: '',
vehicleType: '',
address: '',
details: '',
}
const ProductForm = () => {
  const [formData, setFormData] = useState(init);
  const [pic,setPic]=useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({...formData,photos:pic}))
    setFormData(init)
    setPic([])
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading mb={4}>Product Form</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Product Type</FormLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Select type"
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
          <FormLabel>Upload  Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => uplodeFile(e.target.files[0], setPic)}
          />
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

        <FormControl mb={4}>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </Select>
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

            <FormControl isRequired mb={4}>
              <FormLabel>Details</FormLabel>
              <Textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </FormControl>
          </>
        )}

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
