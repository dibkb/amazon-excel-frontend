"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

// Validation schema
const CredentialsSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(100),
});

export const signup = async (formData: FormData) => {
  try {
    // Validate inputs
    const validated = CredentialsSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validated.success) {
      return {
        success: false,
        error:
          "Username must be 3-20 characters and password must be 8-100 characters",
      };
    }

    // Attempt signup
    const { username, password } = validated.data;

    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    return { success: true, message: "Signup successful" };
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

export const signin = async (formData: FormData) => {
  try {
    // Validate inputs
    const validated = CredentialsSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!validated.success) {
      return {
        success: false,
        error: "Invalid credentials format",
      };
    }

    // Attempt authentication
    const { username, password } = validated.data;

    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    // If we get here, signin was successful
    return { success: true, message: "Signin successful" };
  } catch (error) {
    console.error("Signin error:", error);

    // Handle specific auth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid username or password" };
        default:
          return { success: false, error: "Authentication failed" };
      }
    }

    // Handle other errors
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
