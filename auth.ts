import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { getUserByUsername } from "./db/query/users";
import { verifyPassword } from "./utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),

    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),

    Credentials({
      name: "Credentials",

      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const username = credentials.username as string | undefined;
        const password = credentials.password as string | undefined;

        if (!username || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        const user = await getUserByUsername(username);

        if (!user) {
          throw new Error("Invalid username or password");
        }

        if (!user.password) {
          throw new Error("Invalid username or password");
        }

        const isMatched = verifyPassword(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          username: user.username,
          id: user.id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || "",
          username: (token.username as string) || "",
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: (user as unknown as { username: string }).username,
          id: user.id as string | number,
        };
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      //   if (account?.provider === "google") {
      //     try {
      //       const { email, name, image, id } = user;
      //       await connectDB();
      //       const alreadyUser = await User.findOne({ email });

      //       if (!alreadyUser) {
      //         await User.create({ email, name, image, authProviderId: id });
      //       } else {
      //         return true;
      //       }
      //     } catch (error) {
      //       throw new Error("Error while creating user");
      //     }
      //   }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
