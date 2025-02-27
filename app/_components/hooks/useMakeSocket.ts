import { useEffect } from "react";
import { socketStore } from "@/app/store/socketStore";

export const useMakeSocket = () => {
  const { connect, disconnect } = socketStore();
  useEffect(() => {
    connect();
    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [disconnect, connect]);
};
