"use client";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="grid grid-cols-9 gap-4 mt-[60px]">{children}</main>;
};

export default AuthLayout;
