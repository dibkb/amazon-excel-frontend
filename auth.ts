import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword, verifyPassword } from "@/utils/password";

// Mock database for demonstration
const users = new Map();

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error("Missing credentials");
        }

        // Check if user exists
        //   ----------------------- signup-------------------------
        let user = users.get(username);

        console.log("user", user);

        if (!user) {
          // For signup, create a new user
          const pwHash = saltAndHashPassword(password as string);
          user = {
            id: Date.now().toString(),
            name: username,
            password: pwHash,
          };

          // Store the user
          users.set(username, user);

          // Return user without password
          return {
            id: user.id,
            name: user.name,
          };
        }

        //   ----------------------- signin-------------------------
        const isPasswordValid = verifyPassword(
          password as string,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
