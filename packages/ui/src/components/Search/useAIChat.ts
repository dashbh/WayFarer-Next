import { useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_AI_API_URL}/ai`;

export type ChatMessage = {
  prompt: string;
  response: string;
};

export function useAIChat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAIResponse = async (
    prompt: string,
    stream = false,
    onUpdate?: (partialResponse: string) => void
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt, stream }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response.");

      if (stream) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulated = "";

        if (!reader) throw new Error("Stream reader not available");

        // Add initial message with empty response for streaming
        setChatHistory((prev) => [...prev, { prompt, response: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          // Call external update callback if provided
          if (onUpdate) onUpdate(accumulated);

          // Update chatHistory with latest partial response
          setChatHistory((prev) => [
            ...prev.slice(0, -1),
            { prompt, response: accumulated },
          ]);
        }

        // Finalize the message
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          { prompt, response: accumulated },
        ]);
      } else {
        const data = await response.json();
        setChatHistory((prev) => [...prev, { prompt, response: data.content }]);
      }
    } catch (err) {
      console.error("AI Error:", err);
      setChatHistory((prev) => [
        ...prev,
        { prompt, response: "❌ Failed to get response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    isLoading,
    fetchAIResponse,
  };
}
