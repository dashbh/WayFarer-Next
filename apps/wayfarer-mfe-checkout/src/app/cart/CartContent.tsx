'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Icon,
  StackSeparator,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { ReactElement } from 'react'
import { WayFarerRatings } from '@wayfarer/ui'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function CartContent({product}: {product: any}) {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
        <Stack gap={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={'blue.50'}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            {product.category}
          </Text>
          <Heading>{product.title}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {product.description}
          </Text>
          <Stack
            gap={4}
            separator={
              <StackSeparator borderColor={'gray.100'} />
            }>
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
              iconBg={'yellow.100'}
              text={product.price}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={'green.100'}
              text={'Best Destination'}
            />
                {/* <WayFarerRatings rating={product.rating} /> */}
            <Feature
              icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
              iconBg={'purple.100'}
              text={'Perfect Weather'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={product.image}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
