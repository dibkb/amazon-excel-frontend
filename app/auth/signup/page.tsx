"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Eye from "@/svg/eye";
import EyeSlash from "@/svg/eyeslash";
import Github from "@/svg/github";
import Google from "@/svg/google";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { geistMono } from "@/app/fonts";
import { signup } from "@/server/sign";
import { useRouter } from "next/navigation";
import Warning from "@/svg/warning";

const SignUpPage = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const onChangeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((prev) => !prev);
  };
  const [error, setError] = useState("");
  const handleSignup = async (formData: FormData) => {
    const result = await signup(formData);
    if (result.success && result.shouldRedirect && result.redirectUrl) {
      router.push(result.redirectUrl);
    }
    if (result.error) {
      setError(result.error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);
  return (
    <>
      <div className="col-span-5">
        <AspectRatio ratio={1} className="bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1459478309853-2c33a60058e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-xl object-cover"
          />
        </AspectRatio>
      </div>
      <div className="col-span-4 h-full relative">
        {error && (
          <div className="flex items-center gap-2 absolute top-4 left-4">
            <Warning className="text-red-500 size-6" />
            <p className="text-red-500 font-bold text-sm">{error}</p>
          </div>
        )}
        <div className="p-4 mt-8">
          <p className="text-xl font-bold">Create an account</p>
          <form className="mt-8 flex flex-col gap-6" action={handleSignup}>
            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="username"
                className="ml-4 text-xs text-stone-500 font-medium"
              >
                Signup
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onClick={() => setError("")}
                className={cn(
                  "bg-stone-100 py-6 px-4 rounded-md text-sm font-semibold",
                  geistMono.className,
                  error && "border-red-500 bg-red-50"
                )}
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label
                htmlFor="password"
                className="ml-4 text-xs text-stone-500 font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  onClick={() => setError("")}
                  className={cn(
                    "bg-stone-100 py-6 px-4 rounded-md text-sm font-semibold",
                    geistMono.className,
                    error && "border-red-500 bg-red-50"
                  )}
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
              Sign up
            </Button>
            <div className="flex flex-col gap-2 border-t border-stone-200 pt-8 mt-4">
              <Button className="bg-stone-700 hover:bg-stone-800 text-white py-6 px-4 rounded-md text-sm font-bold">
                <Google />
                Or sign up with Google
              </Button>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Button className="bg-stone-50 hover:bg-stone-100 border text-stone-500 py-6 px-4 rounded-md text-sm font-bold">
                <Github />
                Or sign up with Github
              </Button>
            </div>

            <p className="text-xs text-stone-500 text-center mt-3">
              Already have an account?{""}
              <Link
                href="/auth/signin"
                className="text-blue-500 hover:text-blue-600 font-bold ml-1"
              >
                Sign in now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
