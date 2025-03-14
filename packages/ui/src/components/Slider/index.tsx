"use client";

import { Box, HStack, Slider } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";

interface WayFarerSliderProps {
  maxValue?: number;
  value?: number[];
  onValueChange: (e: any) => void;
  label?: string;
  step?: number;
}

export const WayFarerSlider = ({
  maxValue = 1000,
  step = 10,
  onValueChange,
  label,
  value,
}: WayFarerSliderProps) => {
  return (
    <Slider.Root
      value={value}
      min={0}
      size="md"
      maxWidth={400}
      max={maxValue}
      step={step}
      onValueChange={(e: any) => {
        onValueChange(e);
      }}
      minStepsBetweenThumbs={10}
    >
      <HStack justify="space-between">
        <Slider.Label>{label}</Slider.Label>
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
