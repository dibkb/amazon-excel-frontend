"use client";

import { use, useEffect } from "react";

export default function AbTestPage({
  params,
}: {
  params: Promise<{ testid: string }>;
}) {
  const { testid } = use(params);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/get-ip`);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return <div>AbTestPage {testid}</div>;
}
