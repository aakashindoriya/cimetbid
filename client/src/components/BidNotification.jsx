import { HStack, Image, MenuDivider, MenuItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const BidNotification = ({el,navigate}) => {
  return (
    <>
              <MenuItem
                key={el._id}
                onClick={() => navigate(`product/${el.product._id}`)}
              >
                <HStack spacing={4}>
                  <Image
                    src={el.product.photos[0]}
                    alt={el.product.title}
                    boxSize="100px"
                    objectFit="cover"
                  />
                  <VStack align="start">
                    <Text fontWeight="bold" fontSize="lg">
                      {el.product.title}
                    </Text>
                    <Text>Type: {el.product.type}</Text>
                    <Text>Starting Price: ${el.product.startingPrice}</Text>
                  </VStack>
                </HStack>

                <Text>Bid Amount: ${el.bid.amount}</Text>

                <MenuDivider />
              </MenuItem>
            </>
  )
}

export default BidNotification