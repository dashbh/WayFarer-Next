"use client";

import { faro } from "./faro";

export function reportWebVitals({ id, name, value }: any) {
  faro.api.pushEvent(name, {
    id,
    value,
  });
}
