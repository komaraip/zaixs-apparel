"use client";

import { ActionResult } from "@/types";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";

const initialFormState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}

export default function SignInPage() {
  const [state, formAction] = useActionState(signIn, initialFormState);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-1"
    >
      {" "}
      <div className="container max-w-[1130px] mx-auto flex flex-col items-center justify-center py-5">        <div className="flex justify-center mb-8">
          <Image
            src="/assets/logos/logo-za.png"
            alt="logo"
            width={300}
            height={100}
            className="w-[300px] h-auto"
          />
        </div>

        <form
          action={formAction}
          className="w-[500px] bg-white p-[30px_30px] flex flex-col gap-8 rounded-3xl border border-[#E5E5E5]"
        >
          <h1 className="font-bold text-2xl leading-[34px] text-center">
            Sign In Page
          </h1>
          {state.error !== "" && (
            <div className="border border-red-300 text-red-500 p-3 rounded">
              <h4 className="font-semibold">Error</h4>
              <p className="text-sm">{state.error}</p>
            </div>
          )}{" "}          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/sms.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Email Address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            {" "}            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  src="/assets/icons/lock.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Password"
              />{" "}              <button
                onClick={togglePasswordVisibility}
                type="button"
                className="reveal-password flex shrink-0"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src={
                    showPassword
                      ? "/assets/icons/eye.svg"
                      : "/assets/icons/eye.svg"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <a
              href="#"
              className="text-sm text-[#616369] underline w-fit mr-2 ml-auto"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <SubmitButton />{" "}
            <h4 className="font-semibold text-center">
              Don&apos;t have an account?
              <Link href="/sign-up" className="underline">
                {" "}
                Sign Up
              </Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}
