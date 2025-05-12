"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);

  return (
    <div className="w-full py-20 px-5 bg-gray-50">
      <div className="flex items-center justify-center">
        <div className="max-w-lg bg-gray-50 shadow-xl rounded-lg p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-5">
            Subscribe to our Newsletter
          </h2>
          <form
            className="flex flex-col md:flex-row gap-3"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              setError(false);
              setState("submitting");

              // Simulate submit logic
              setTimeout(() => {
                if (email === "fail@example.com") {
                  setError(true);
                  setState("initial");
                  return;
                }

                setState("success");
              }, 1000);
            }}
          >
            <input
              type="email"
              id="email"
              required
              placeholder="Your Email"
              aria-label="Your Email"
              value={email}
              disabled={state !== "initial"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type={state === "success" ? "button" : "submit"}
              className={`w-full md:w-40 p-2 rounded-md text-white ${
                state === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition`}
              disabled={state === "submitting"}
            >
              {state === "success" ? <FaCheck /> : "Submit"}
            </button>
          </form>
          <p
            className={`mt-2 text-center ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {error
              ? "Oh no an error occurred! 😢 Please try again later."
              : "You won't receive any spam! ✌️"}
          </p>
        </div>
      </div>
    </div>
  );
}
