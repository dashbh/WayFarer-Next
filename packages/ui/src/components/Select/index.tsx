"use client";

import { ComponentProps } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";

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
