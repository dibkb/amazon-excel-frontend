"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getAllTests } from "@/db/query/test";
import { SelectABTest } from "@/src/schema";
import Image from "next/image";
import { geistMono } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState<SelectABTest[] | undefined>(undefined);
  const userId = session?.user?.id;
  useEffect(() => {
    async function getTestData() {
      if (userId) {
        setIsLoading(true);
        const test = await getAllTests(userId);
        setTests(test);
        setIsLoading(false);
      }
    }
    getTestData();
  }, [userId]);
  if (isLoading) {
    return (
      <div className="flex gap-2 items-center justify-start h-full">
        <Image
          src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="Loading..."
          width={20}
          height={20}
        />
        <p className="text-stone-500 text-sm font-medium">Loading...</p>
      </div>
    );
  }
  return (
    <main>
      <p className="text-stone-500 font-medium my-4">
        🧪 Your tests are listed below
      </p>
      <div className="grid grid-cols-2 gap-4">
        {tests?.map((test, id) => (
          <Link
            href={`/dashboard/${test.id}`}
            key={test.id + id}
            target="_blank"
            className={cn(
              "flex flex-col gap-2 p-4 rounded-xl",
              "border border-stone-200",
              "hover:bg-stone-100 hover:border-stone-800",
              "transition-all duration-300 ease-in-out",
              geistMono.className
            )}
          >
            {/* Content remains the same */}
            <p>{test.asin}</p>
            <p>{test.id}</p>
            <p>{test.createdAt.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
