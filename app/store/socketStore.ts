import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketMessage {
  id: string;
  content: unknown;
  timestamp: number;
}

interface SocketState {
  // Connection state
  socket: Socket | null;
  isConnected: boolean;
  connectionError: Error | null;

  // Data
  messages: SocketMessage[];

  // Actions
  connect: () => void;
  disconnect: () => void;
  clearMessages: () => void;
  sendMessage: (event: string, data: unknown) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  // Initial state
  socket: null,
  isConnected: false,
  connectionError: null,
  messages: [],
  welcomeMessage: null,

  // Connect to socket server
  connect: () => {
    // Don't create multiple connections
    if (get().socket) return;

    const socket = io("http://localhost:8000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Set socket in state
    set({ socket });

    // Set up event listeners
    socket.on("connect", () => {
      set({ isConnected: true, connectionError: null });
      console.log("Connected to Socket.IO server", socket.id);
    });

    socket.on("connect_error", (error) => {
      set({ isConnected: false, connectionError: error as Error });
      console.error("Connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      set({ isConnected: false });
      console.log("Disconnected:", reason);
    });
  },

  // Disconnect from socket server
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
      });
    }
  },

  // Clear all messages
  clearMessages: () => {
    set({ messages: [] });
  },

  // Send a message to the server
  sendMessage: (event: string, data: unknown) => {
    const { socket, isConnected } = get();
    if (socket && isConnected) {
      socket.emit(event, data);
    } else {
      console.error("Cannot send message: Socket not connected");
    }
  },
}));
