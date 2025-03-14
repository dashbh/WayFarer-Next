"use client";

import { ComponentProps } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import type { SingleValue, MultiValue, Props as SelectProps } from "react-select";

export type { SingleValue, MultiValue, SelectProps }; // Re-export types

type WayFarerSelectProps = ComponentProps<typeof Select>;
const SelectNoSSR = dynamic(() => import("react-select"), { ssr: false });

export const WayFarerSelect = (props: WayFarerSelectProps) => {
  return <SelectNoSSR {...props} styles={{
    container: (base) => ({
      ...base,
      width: "100%", // Ensures full width
    }),
  }}
/>;
};
