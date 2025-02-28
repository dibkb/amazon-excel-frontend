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

  // Auto-reconnect state
  autoReconnect: boolean;
  reconnectAttempts: number;
}

export const socketStore = create<SocketState>((set, get) => ({
  // Initial state
  socket: null,
  isConnected: false,
  connectionError: null,
  messages: [],

  // Auto-reconnect state
  autoReconnect: true,
  reconnectAttempts: 0,

  // Connect to socket server
  connect: () => {
    if (get().socket) return;

    console.log("Attempting to connect to Socket.IO server...");

    const socket = io("http://localhost:8000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity, // Keep trying to reconnect
      reconnectionDelay: 1000,
      timeout: 20000,
      withCredentials: true,
      autoConnect: true,
    });

    set({ socket });

    // Set up event listeners
    socket.on("connect", () => {
      set({ isConnected: true, connectionError: null, reconnectAttempts: 0 });
      console.log("Connected to Socket.IO server", socket.id);
    });

    socket.on("connect_error", (error) => {
      const attempts = get().reconnectAttempts + 1;
      set({
        isConnected: false,
        connectionError: error as Error,
        reconnectAttempts: attempts,
      });
      console.error(`Connection error (attempt ${attempts}):`, error);
    });

    socket.on("disconnect", (reason) => {
      set({ isConnected: false });
      console.log("Disconnected:", reason);
    });

    // Add more debugging
    socket.io.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });

    // Add reconnection handling
    socket.io.on("reconnect", (attempt) => {
      console.log(`Reconnected after ${attempt} attempts`);
      set({ isConnected: true, connectionError: null, reconnectAttempts: 0 });
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
      set({ reconnectAttempts: attempt });
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

// Auto-connect when the store is initialized
socketStore.getState().connect();
