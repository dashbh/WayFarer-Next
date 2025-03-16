'use client'

import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { FaCheck } from "react-icons/fa6";

export default function OrderSuccess() {
  return (
    <Box alignItems="center" justifyContent="center" py={10} px={6}>
        <VStack>
      <FaCheck size={'50px'} color={'teal'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Order Placed Successfully.
      </Heading>
      <Text color={'gray.500'}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </Text>
      </VStack>
    </Box>
  )
}