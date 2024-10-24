import { Box, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useSelector} from "react-redux"
export const Pagination = () => {
    const {totalpages}=useSelector((store)=>store.product)
    
    let arr=[]
  return (
    <Box>
        <HStack>

        </HStack>
    </Box>
  )
}
