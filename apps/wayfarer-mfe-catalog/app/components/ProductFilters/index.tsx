import { Slider, Box, Text, HStack } from "@chakra-ui/react";

const ProductFilters = ({
  setPriceRange,
}: {
  setPriceRange: (price: number[]) => void;
}) => {
  return (
    <Box>
      <Slider.Root
        defaultValue={[100]}
        min={0}
        size="lg"
        width="200px" 
        max={1000}
        step={10}
        onValueChange={(e) => setPriceRange(e.value)}
      >
        <HStack justify="space-between">
          <Slider.Label>Max Price</Slider.Label>
          <Slider.ValueText />
        </HStack>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
};

export default ProductFilters;
