"use client";

import { loginAction } from "@/actions/auth";
import Image from "next/image";
import { useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";

interface LoginFormProps {
  //   searchParams: Record<string, string>;
  searchParams: any;
}

export default function LoginForm({ searchParams }: LoginFormProps) {
  //   const router = useRouter();

  const [state, formAction, pending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
      //   router.push(searchParams.redirect || "/");
    }
  }, [state?.success, searchParams]);

  return (
    <div className="min-h-screen items-center bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="max-w-sm rounded overflow-hidden md:shadow-lg px-20 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="WayFarer"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            width={40}
            height={40}
            className="mx-auto h-10 w-auto"
            priority
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="usename"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="usename"
                  name="usename"
                  type="text"
                  required
                  autoComplete="usename"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={pending}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <div role="alert" className="mt-2 text-red-500">
                <span>{state?.error}</span>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
