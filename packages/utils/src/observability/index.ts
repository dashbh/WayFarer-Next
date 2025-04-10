"use client";

// This file is responsible for initializing the Grafana Faro SDK and providing utility functions for logging errors, events, and web vitals.
// It uses the Faro SDK to send telemetry data to a Grafana instance.

import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export const faro = initializeFaro({
  url: `${process.env.NEXT_PUBLIC_GRAFANA_FARO_URL}`,
  app: {
    name: "Wayfarer",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production",
  },

  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),
  ],
});

/**
 * Reports Web Vitals metrics.
 */
export function reportWebVitals(metric: any) {
  faro?.api.pushMeasurement(metric);
}
