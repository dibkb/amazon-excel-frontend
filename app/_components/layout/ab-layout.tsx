import { geistMono } from "@/app/fonts";
import { cn } from "@/lib/utils";
import React from "react";
interface AbLayoutProps {
  a: React.ReactNode;
  b: React.ReactNode;
  onSelectHandler: (part: "a" | "b") => void;
}
const AbLayout = ({ a, b, onSelectHandler }: AbLayoutProps) => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <span
          onClick={() => onSelectHandler("a")}
          className={cn(
            "text-2xl text-center py-2 rounded-md border cursor-pointer hover:bg-green-400 border-green-500 bg-green-200 text-green-700 mb-6",
            geistMono.className
          )}
        >
          A
        </span>
        <div className="overflow-y-auto p-4 flex-1">{a}</div>
      </div>
      <div className="rounded-md flex flex-col overflow-hidden">
        <span
          className={cn(
            "text-2xl text-center py-2 rounded-md border cursor-pointer hover:bg-blue-400 border-blue-500 bg-blue-200 text-blue-700 mb-6",
            geistMono.className
          )}
          onClick={() => onSelectHandler("b")}
        >
          B
        </span>
        <div className="overflow-y-auto p-4 flex-1">{b}</div>
      </div>
    </>
  );
};

export default AbLayout;
