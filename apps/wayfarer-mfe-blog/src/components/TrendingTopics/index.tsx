import { Box, Wrap, WrapItem, Tag, Badge} from "@chakra-ui/react";
import Link from "next/link";
import { Topic } from "@/types/blog";

interface TrendingTopicsProps {
  topics: Topic[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <Box w="100%" py={6} px={5}>
      <Wrap gap={3}>
        {topics.map((topic) => (
          <WrapItem key={topic.slug}>
            <Link href={`/tag/${topic.slug}`} passHref>
            <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "blue.500", color: "white" }}
                  // onClick={() => onTagClick(topic.name)}
                >
                  #{topic.name}
                </Badge>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default TrendingTopics;
