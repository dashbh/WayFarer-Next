"use client";

import { MdGraphicEq } from "react-icons/md";

interface WayFarerSliderProps {
  maxValue?: number;
  value?: number[];
  onValueChange: (e: number[]) => void;
  label?: string;
  step?: number;
}

export const WayFarerSlider = ({
  maxValue = 1000,
  step = 10,
  onValueChange,
  label,
  value = [0],
}: WayFarerSliderProps) => {
  return (
    <div className="w-full max-w-md">
      {/* Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-500">{value[0]}</span>
      </div>

      {/* Slider */}
      <div className="relative w-full">
        <input
          type="range"
          min={0}
          max={maxValue}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([Number(e.target.value)])}
          className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
        />
        <div
          className="absolute top-0 left-0 h-2 bg-tomato rounded-lg"
          style={{
            width: `${((value[0] || 1) / maxValue) * 100}%`,
          }}
        ></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-[calc(var(--thumb-position, 0%))] w-6 h-6 bg-white border-2 border-tomato rounded-full shadow-md flex items-center justify-center"
          // style={{
          //   "--thumb-position": `${(value[0] / maxValue) * 100}%`,
          // }}
        >
          <MdGraphicEq className="text-tomato" />
        </div>
      </div>
    </div>
  );
};
