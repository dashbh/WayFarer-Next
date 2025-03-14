"use client";

import Select, { Props } from "react-select";

export const WayFarerSelect = <T,>(props: Props<T>) => {
  return <Select {...props} />;
};
