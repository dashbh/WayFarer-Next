"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import {
  Stack,
  Fieldset,
  Input,
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);

  return (
    <Box w="100%" py={20} px={20} bg="gray.50">
      <Flex align={"center"} justify={"center"} bg="gray.50">
        <Container
          maxW={"lg"}
          bg={"gray.50"}
          boxShadow={"xl"}
          rounded={"lg"}
          p={6}
        >
          <Heading
            as={"h2"}
            fontSize={{ base: "xl", sm: "2xl" }}
            textAlign={"center"}
            mb={5}
          >
            Subscribe to our Newsletter
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            as={"form"}
            gap={"12px"}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              setError(false);
              setState("submitting");

              // remove this code and implement your submit logic right here
              setTimeout(() => {
                if (email === "fail@example.com") {
                  setError(true);
                  setState("initial");
                  return;
                }

                setState("success");
              }, 1000);
            }}
          >
            <Fieldset.Root>
              <Input
                //   variant={'solid'}
                borderWidth={1}
                color={"gray.800"}
                _placeholder={{
                  color: "gray.400",
                }}
                borderColor={"gray.300"}
                id={"email"}
                type={"email"}
                required
                placeholder={"Your Email"}
                aria-label={"Your Email"}
                value={email}
                disabled={state !== "initial"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </Fieldset.Root>
            <Fieldset.Root w={{ base: "100%", md: "40%" }}>
              <Button
                colorScheme={state === "success" ? "green" : "blue"}
                loading={state === "submitting"}
                w="100%"
                type={state === "success" ? "button" : "submit"}
              >
                {state === "success" ? <FaCheck /> : "Submit"}
              </Button>
            </Fieldset.Root>
          </Stack>
          <Text
            mt={2}
            textAlign={"center"}
            color={error ? "red.500" : "gray.500"}
          >
            {error
              ? "Oh no an error occured! 😢 Please try again later."
              : "You won't receive any spam! ✌️"}
          </Text>
        </Container>
      </Flex>
    </Box>
  );
}
