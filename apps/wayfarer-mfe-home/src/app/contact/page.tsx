import { Box, Heading, Text, Image, Input, Textarea, Button, VStack, HStack, Icon, Spacer } from "@chakra-ui/react";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

export default function ContactUs() {
  return (
    <Box maxW="100vw" p={0}>
      {/* Banner Section */}
      <Box position="relative" w="100%" h="300px">
        <Image
          src="/images/contact-banner.jpg"
          alt="Contact Us"
          objectFit="cover"
          w="100%"
          h="100%"
          filter="brightness(70%)"
        />
        <Heading
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize="4xl"
          fontWeight="bold"
        >
          Contact Us
        </Heading>
      </Box>

      {/* Contact Details Section */}
      <Box p={8} textAlign="center">
        <Heading size="lg" mb={4}>
          Get in Touch with Us
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Have any questions? Reach out to us, and we’ll be happy to assist you.
        </Text>

        <VStack gap={6} align="center" mt={6}>
          <HStack>
            <FaPhone color="blue.500" />
            <Text fontSize="md">+1 234 567 890</Text>
          </HStack>
          <HStack>
            <FaEnvelope color="blue.500" />
            <Text fontSize="md">support@yourcompany.com</Text>
          </HStack>
          <HStack>
            <FaMapMarkerAlt color="blue.500" />
            <Text fontSize="md">123 Business Street, Tech City, USA</Text>
          </HStack>
        </VStack>

        <Spacer my={8} />

        <Heading size="md" mb={4}>
          Our Office Locations
        </Heading>
        <VStack gap={4} align="center">
          <HStack>
            <FaBuilding color="green.500" />
            <Text fontSize="md">Headquarters: San Francisco, CA</Text>
          </HStack>
          <HStack>
            <FaBuilding color="green.500" />
            <Text fontSize="md">Branch: New York, NY</Text>
          </HStack>
          <HStack>
            <FaBuilding color="green.500" />
            <Text fontSize="md">Branch: London, UK</Text>
          </HStack>
        </VStack>
      </Box>

      {/* Contact Form Section */}
      <Box p={8} bg="gray.100">
        <Heading size="lg" textAlign="center" mb={6}>
          Send Us a Message
        </Heading>
        <Box maxW="600px" mx="auto" bg="white" p={6} borderRadius="md" boxShadow="md">
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
}
