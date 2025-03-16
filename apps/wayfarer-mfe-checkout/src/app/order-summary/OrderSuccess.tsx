"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

import { ReactElement } from "react";
// import { WayFarerRatings } from '@wayfarer/ui'

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} py={2} my={5}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={400}>{text}</Text>
    </Stack>
  );
};

export default function OrderSuccess() {
  return (
    <Box alignItems="center" justifyContent="center" py={10} px={6}>
      <VStack>
        <FaCheck size={"50px"} color={"teal"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Order Placed Successfully.
        </Heading>
        <Text color={"gray.500"}>
          Thank you for shopping with us! Your order has been successfully
          processed and is now being prepared for shipment.
        </Text>

<Box alignItems="left" justifyContent="left">
        <Heading size={"2xl"}>Order Details</Heading>
        <Feature
          icon={<Icon as={FaCheck} color={"yellow.500"} w={5} h={5} />}
          iconBg={"yellow.100"}
          text={
            "You will receive a confirmation email with your order summary and tracking details shortly."
          }
        />
        <Feature
          icon={<Icon as={FaCheck} color={"green.500"} w={5} h={5} />}
          iconBg={"green.100"}
          text={
            "Estimated delivery time: 3-5 business days (depending on your location)."
          }
        />
        {/* <WayFarerRatings rating={product.rating} /> */}
        <Feature
          icon={<Icon as={FaCheck} color={"purple.500"} w={5} h={5} />}
          iconBg={"purple.100"}
          text={
            "If you have any questions, feel free to reach out to our customer support."
          }
        />
        </Box>
      </VStack>
    </Box>
  );
}
