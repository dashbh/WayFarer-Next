"use client";

import { Box, HStack, Slider } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";

interface WayFarerSliderProps {
  maxValue?: number;
  defaultValue?: number[];
  onChange: (value: { min: number; max: number }) => void;
  label?: string;
  step?: number;
}

export const WayFarerSlider = ({
  maxValue = 1000,
  defaultValue = [100],
  step = 10,
  onChange,
}: WayFarerSliderProps) => {
  return (
    <Slider.Root
      defaultValue={[...defaultValue]}
      min={0}
      size="lg"
      width="500px"
      max={maxValue}
      step={step}
      onValueChange={(e: any) => {
        onChange({ min: e.value[0], max: e.value[1] });
      }}
      minStepsBetweenThumbs={10}
    >
      <HStack justify="space-between">
        <Slider.Label>Max Price</Slider.Label>
        <Slider.ValueText />
      </HStack>
      <Slider.Control>
        <Slider.Track bg="red.100">
          <Slider.Range bg="tomato" />
        </Slider.Track>
        <Slider.Thumbs boxSize={6} borderColor="tomato" shadow="md">
          <Box color="tomato" as={MdGraphicEq} />
        </Slider.Thumbs>
      </Slider.Control>
    </Slider.Root>
  );
};
