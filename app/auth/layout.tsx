import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-[calc(100dvh-100px)] grid grid-cols-9 gap-4">
      {children}
    </main>
  );
};

export default AuthLayout;
