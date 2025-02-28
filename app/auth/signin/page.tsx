"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Eye from "@/svg/Eye";
import EyeSlash from "@/svg/eyeslash";
import Github from "@/svg/github";
import Google from "@/svg/google";
import Link from "next/link";

import React, { useState } from "react";

const SignInPage = () => {
  const [visible, setVisible] = useState(false);
  const onChangeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((prev) => !prev);
  };
  return (
    <div className="p-4 mt-8">
      <p className="text-xl font-bold">Nice to see you again!</p>
      <form className="mt-8 flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label
            htmlFor="Username"
            className="ml-4 text-xs text-stone-500 font-medium"
          >
            Signin
          </Label>
          <Input
            type="text"
            id="Username"
            placeholder="Username"
            className="bg-stone-100 py-6 px-4 rounded-md text-sm font-semibold"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label
            htmlFor="Username"
            className="ml-4 text-xs text-stone-500 font-medium"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              type={visible ? "text" : "password"}
              id="Password"
              placeholder="Enter password"
              className="bg-stone-100 py-6 px-4 rounded-md text-sm font-semibold"
            />
            <span
              onClick={onChangeVisibility}
              className="absolute z-20 right-4 top-1/2 -translate-y-1/2 cursor-pointer text-stone-500"
            >
              {visible ? (
                <Eye className="size-4" />
              ) : (
                <EyeSlash className="size-4" />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="remember-me" className="text-blue-500" />
          <Label htmlFor="remember-me" className="text-xs text-stone-500">
            Remember me
          </Label>
        </div>

        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-6 px-4 rounded-md text-sm font-bold">
          Sign in
        </Button>
        <div className="flex flex-col gap-2 border-t border-stone-200 pt-8 mt-4">
          <Button className="bg-stone-700 hover:bg-stone-800 text-white py-6 px-4 rounded-md text-sm font-bold">
            <Google />
            Or sign in with Google
          </Button>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Button className="bg-stone-50 hover:bg-stone-100 border text-stone-500 py-6 px-4 rounded-md text-sm font-bold">
            <Github />
            Or sign in with Github
          </Button>
        </div>

        <p className="text-xs text-stone-500 text-center mt-3">
          Don&apos;t have an account?{""}
          <Link
            href="/auth/signup"
            className="text-blue-500 hover:text-blue-600 font-bold ml-1"
          >
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
