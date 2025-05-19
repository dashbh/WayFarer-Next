import { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { BsStars, BsSearch } from "react-icons/bs";
import { AIChatComponent } from "./AIChat";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Ask me anything...",
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="hidden lg:block">
        <input
          type="text"
          onClick={openModal}
          placeholder={`🔍 ${placeholder}`}
          className="px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-300 focus:outline-none cursor-pointer"
          readOnly
        />
      </div>

      {/* Icon Button for Mobile & Tablet */}
      <div className="block lg:hidden">
        <button
          onClick={openModal}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer"
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
                      <BsStars className="text-teal-800" style={{ fontSize: "25px" }}/>
                      <span>AI Assistance</span>
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>

                  <AIChatComponent />

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
