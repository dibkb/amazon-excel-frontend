import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[calc(100dvh-100px)] grid grid-cols-9 gap-4">
      <div className="bg-stone-900 rounded-md col-span-6"></div>
      <div className="col-span-3 h-full">{children}</div>
    </main>
  );
};

export default AuthLayout;
