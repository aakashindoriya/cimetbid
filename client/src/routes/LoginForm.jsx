'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { loginUser } from '../redux/actions/authAction'
import {Link, useNavigate} from "react-router-dom"

export default function LoginForm() {
  const {user,token,isLoading, error} =useSelector((store)=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const toast=useToast()
    let [data,setData]=useState({
        email:"",password:""
    })
  const [showPassword,setShowPassword]=useState(false)
    function HandleFormChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      if(token){
        toast({
          title: `Welcome ${user.username}.`,
          status: 'success',
          duration: 500,
          isClosable: true,
          position: 'top'
        })
        setTimeout(()=>{
          navigate("/")
        },500)
      }
      if(error){
        toast({
          title: `Error ${error}.`,
          status: 'error',
          duration: 1500,
          isClosable: true,
          position: 'top'
        })
      }
    },[token,user,error])
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')} border={"1px soild red"}>
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6} >
        <Stack align={'center'} >
          <Heading fontSize={'4xl'}>Login to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Cimet Bids <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  name="email" value={data.email} onChange={HandleFormChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" value={data.password} onChange={HandleFormChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                disabled={isLoading}
                onClick={()=>{
                    dispatch(loginUser(data))
                    setData({email:"",password:""})
                }}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {isLoading?"Signing in...":"Sign in"}
              </Button>
            </Stack>
            <Stack pt={6}>
                <Text align={'center'}>
                  Not have an account ? <Link to="/signup" color={'blue.400'}>Register</Link>
                </Text>
              </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
