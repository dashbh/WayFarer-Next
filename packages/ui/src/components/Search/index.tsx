import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { BsStars, BsSearch } from "react-icons/bs";
import { RiRobot3Fill } from "react-icons/ri";
import OpenAI from "openai";

interface SearchBarProps {
  placeholder?: string;
}

interface ChatMessage {
  query: string;
  response: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Ask me anything...",
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSearchQuery("");
    setChatHistory([]);
  };

  const fetchAIResponse = async (query: string) => {
    setIsLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.responses.create({
        model: "gpt-4.1",
        input: `${query}`,
      });

      const response =
        completion.output_text || "Unable to answer. Please try again.";

      // Update chat history
      setChatHistory((prev) => [...prev, { query, response }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatHistory((prev) => [
        ...prev,
        { query, response: "Unable to answer. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      fetchAIResponse(searchQuery);
      setSearchQuery(""); // Clear the input field after submitting
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="hidden sm:block">
        <input
          type="text"
          onClick={openModal}
          placeholder={`🔍 ${placeholder}`}
          className="px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-300 focus:outline-none cursor-pointer"
          readOnly
        />
      </div>

      {/* Icon Button for Mobile & Tablet */}
      <div className="block sm:hidden">
        <button
          onClick={openModal}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <BsSearch />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 bg-opacity-50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex min-h-full items-start justify-center p-4 text-center"
              style={{ marginTop: "10%" }}
            >
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <BsStars className="text-green-400" />
                      <span>Chatbot</span>
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Search Bar */}

                  {isLoading && (
                    <p className="text-gray-500">Fetching AI response...</p>
                  )}

                  {/* Chat History */}
                  <div className="mt-8 space-y-4 max-h-96 overflow-y-auto">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className="space-y-2">
                        {/* User Query */}
                        <div className="flex items-start space-x-2">
                          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                            {chat.query}
                          </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-end items-end space-x-2">
                          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                            {chat.response}
                          </div>
                          <RiRobot3Fill className="text-green-400 mt-1" />
                        </div>
                        {/* <hr /> */}
                      </div>
                    ))}

                    <div className="mb-4">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`🔍 ${placeholder}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export { SearchBar };
