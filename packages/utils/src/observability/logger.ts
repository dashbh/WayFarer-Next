import { isServer } from "../env";
import { faro } from "./";

// Define log levels
enum LogLevel {
  TRACE = "trace",
  DEBUG = "debug",
  INFO = "info",
  LOG = "log",
  WARN = "warn",
  ERROR = "error",
}

const sendToLoki = async (level: string, message: string, details?: any) => {
  try {
    await fetch(process.env.NEXT_PUBLIC_LOGS_API_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message, details }),
    });
  } catch (error) {
    console.error("Failed to send log to Loki:", error);
  }
};

export const logger = {
  /**
   * Generic log function to handle different levels.
   */
  log: (
    level: LogLevel,
    message: string,
    details: Record<string, string> = {}
  ) => {
    console[level](`[${level.toUpperCase()}]`, message, details);

    if (isServer) {
      sendToLoki(level, message, details);
    } else {
      // Send logs to Grafana Faro SDK
      if (level === "error") {
        faro?.api.pushError(new Error(message), details);
      } else {
        faro?.api.pushLog([message], {
          level,
          context: details,
        });
      }
    }
  },

  /**
   * Shortcut methods for common log levels.
   */
  debug: (message: string, details?: Record<string, string>) =>
    logger.log(LogLevel.DEBUG, message, details),

  info: (message: string, details?: Record<string, string>) =>
    logger.log(LogLevel.INFO, message, details),

  warn: (message: string, details?: Record<string, string>) =>
    logger.log(LogLevel.WARN, message, details),

  error: (error: Error | string, details?: Record<string, string>) => {
    const errorMessage = error instanceof Error ? error.message : error;
    logger.log(LogLevel.ERROR, errorMessage, details);
  },
};
