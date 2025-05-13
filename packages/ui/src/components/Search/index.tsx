import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { BsStars } from "react-icons/bs";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <input
        type="text"
        onClick={openModal}
        placeholder={placeholder}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        readOnly
      />

      {/* Modal */}
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                      <BsStars />
                      <span>Search</span>
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Response Section */}
                  <div className="mt-4">
                    {searchQuery ? (
                      <p className="text-gray-700">
                        Results for "{searchQuery}"
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Start typing to see results...
                      </p>
                    )}
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
