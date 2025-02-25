"use client";

import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
let socket: Socket;

export default function Improvements() {
  useEffect(() => {
    // Connect to the FastAPI Socket.IO server with proper options
    const socket = io("http://localhost:8000", {
      transports: ["websocket", "polling"], // Try WebSocket first, fall back to polling
      path: "/socket.io/", // Default path, usually not needed to specify
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // How long to wait before reconnect (ms)
      timeout: 20000, // Connection timeout (ms)
    });

    socket.on("connect", () => {
      console.log("Connected to FastAPI Socket.IO server", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("welcome", (data: { message: string }) => {
      console.log("Received welcome message:", data);
    });

    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>Improvements</div>;
}
