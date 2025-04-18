"use server";

import { signIn } from "@/auth";
import { db } from "@/src/db";
import { AuthError } from "next-auth";
import { z } from "zod";
import { usersTable } from "@/src/schema";
import { saltAndHashPassword } from "@/utils/password";
// Validation schema
const CredentialsSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(100),
});

interface SigninResponse {
  success: boolean;
  message?: string;
  user?: {
    username: string;
    id: string;
  };
  shouldRedirect?: boolean;
  redirectUrl?: string;
  error?: string;
}
export const signup = async (formData: FormData): Promise<SigninResponse> => {
  try {
    // Validate inputs
    const validated = CredentialsSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validated.success) {
      return {
        success: false,
        error: "Input should be min 3 characters and max 20 characters",
      };
    }

    // Attempt signup
    const { username, password } = validated.data;

    const user = await db
      .insert(usersTable)
      .values({
        username,
        password: saltAndHashPassword(password),
      })
      .returning();
    return {
      success: true,
      message: "Signup successful",
      user: {
        username: user[0].username,
        id: user[0].id,
      },
      shouldRedirect: true,
      redirectUrl: "/auth/signin?success=true",
    };
  } catch (error) {
    console.error("Signup error:", error);
    // Handle specific auth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials" };
        default:
          return { success: false, error: "Authentication failed" };
      }
    }

    // Extract error message if available
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return { success: false, error: errorMessage };
  }
};

export const signin = async (formData: FormData): Promise<SigninResponse> => {
  try {
    // Validate inputs
    const validated = CredentialsSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validated.success) {
      return {
        success: false,
        error: "Input should be min 3 characters and max 20 characters",
      };
    }

    // Attempt authentication
    const { username, password } = validated.data;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    // If we get here, signin was successful
    return {
      success: true,
      message: "Signin successful",
      user: {
        username: result.user?.username,
        id: result.user?.id,
      },
      shouldRedirect: true,
      redirectUrl: "/",
    };
  } catch (error) {
    // Handle specific auth errors
    console.log("error", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: error.message.split(".")[0] };
        default:
          return { success: false, error: "Authentication failed" };
      }
    }

    // Handle other errors
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
