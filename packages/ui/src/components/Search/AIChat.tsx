import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
// import sanitizeHtml from "sanitize-html"; // optional, install via npm i sanitize-html
import { RiRobot3Fill } from "react-icons/ri";
import { MdOutlineGrain } from "react-icons/md";
import { BsStars, BsSearch } from "react-icons/bs";
import { useAIChat, ChatMessage } from "./useAIChat";

interface AIChatComponentProps {
  placeholder?: string;
}

// function sanitizeMarkdown(md: string) {
//   // Optional: sanitize HTML inside markdown
//   return sanitizeHtml(md, {
//     allowedTags: sanitizeHtml.defaults.allowedTags.filter((tag: string) => tag !== "img"),
//   });
// }

export const AIChatComponent: React.FC<AIChatComponentProps> = ({
  placeholder = "Ask me anything...",
}) => {
  const { chatHistory, isLoading, fetchAIResponse } = useAIChat();
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const prompt = searchQuery.trim();
      setSearchQuery("");

      // Fetch with streaming enabled
      await fetchAIResponse(prompt, true);
    }
  };

  useEffect(() => {
  if (isLoading && progressRef.current) {
    progressRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [isLoading, chatHistory]);

  return (
    <div
      ref={containerRef}
      className="mt-8 space-y-4 max-h-125 w-full overflow-y-auto p-2 rounded-lg"
    >
      {chatHistory.map((chat: ChatMessage, index: number) => {
        const isLast = index === chatHistory.length - 1;
        return (
          <div key={index} className="space-y-2">
            {/* User Query */}
            <div className="flex items-start space-x-2">
              <div className="bg-green-100 text-gray-800 px-4 py-2 rounded-lg whitespace-pre-wrap max-w-[70%] break-words">
                {chat.prompt}
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-end items-end space-x-2 mt-2">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg whitespace-pre-wrap break-words w-full max-w-xl min-h-[2.5rem] text-sm transition-all duration-300 ease-in-out">
                {isLast && isLoading && (
                  <div ref={progressRef}>
                  <BsStars
                    
                    className="text-teal-800 block animate-spin my-2"
                    style={{ fontSize: "25px" }}
                  />
                  </div>
                )}
                <ReactMarkdown
                  components={{
                    img: () => null, // disable image rendering
                  }}
                >
                  {chat.response}
                </ReactMarkdown>
              </div>
              <RiRobot3Fill className="text-green-400 mt-1" />
            </div>
          </div>
        );
      })}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`🔍 ${placeholder}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
