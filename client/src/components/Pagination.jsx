import { Box, Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useSelector} from "react-redux"
export const Pagination = ({changePage}) => {
    const {totalpages,page}=useSelector((store)=>store.product)
    console.log(totalpages,page)
  return (
    <Box w="100%" m="5">
        <HStack w="40%" m="auto">
          <Button disabled={page==1} onClick={()=>changePage(page-1)}>Prev</Button>
          <Button>{page}</Button>
          {
            totalpages>page+1&&<Button onClick={()=>changePage(page+1)}>{page+1}</Button>
          }
          {
            totalpages>page+2&&<Button disabled="true">...</Button>
          }{
            totalpages>page+1&&<Button onClick={()=>changePage(totalpages)}>{totalpages}</Button>
          }
          <Button disabled={page==totalpages} onClick={()=>changePage(page+1)}>Next</Button>
        </HStack>
    </Box>
  )
}
