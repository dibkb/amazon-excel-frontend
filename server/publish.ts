"use server";

import { db } from "@/src/db";
import {
  abTestReviewsTable,
  abTestsTable,
  InsertABTestReview,
} from "@/src/schema";

export const publishBranch = async (userId: string, asin: string) => {
  const test = await db
    .insert(abTestsTable)
    .values({
      userId: userId,
      asin: asin,
    })
    .returning();
  return {
    success: true,
    message: "Branch published successfully",
    id: test[0].id,
  };
};

export const submitTestResults = async ({
  abTestId,
  name,
  latitude,
  longitude,
  city,
  country,
  thumbnail,
  product,
  review,
}: InsertABTestReview) => {
  const result = await db
    .insert(abTestReviewsTable)
    .values({
      abTestId: abTestId,
      name: name,
      thumbnail: thumbnail,
      product: product,
      latitude: latitude,
      longitude: longitude,
      city: city,
      country: country,
      review: review,
    })
    .returning();
  return {
    success: true,
    message: "Test results submitted successfully",
    id: result[0].id,
  };
};
