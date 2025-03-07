import { db } from "@/src/db";

import {
  abTestReviewsTable,
  abTestsTable,
  SelectABTest,
  SelectABTestReview,
  SelectUser,
} from "@/src/schema";
import { eq, and } from "drizzle-orm";
export async function getTest(
  userId: SelectUser["id"],
  asin: string
): Promise<SelectABTest | undefined> {
  const test = await db
    .select()
    .from(abTestsTable)
    .where(and(eq(abTestsTable.userId, userId), eq(abTestsTable.asin, asin)))
    .then((res) => {
      if (res.length > 0) {
        return res[0];
      }
      return undefined;
    });
  return test;
}

export async function getAllTests(
  userId: SelectUser["id"]
): Promise<SelectABTest[] | undefined> {
  const test = await db
    .select()
    .from(abTestsTable)
    .where(eq(abTestsTable.userId, userId))
    .then((res) => {
      if (res.length > 0) {
        return res;
      }
      return undefined;
    });
  return test;
}

export async function getTestById(
  testId: SelectABTest["id"]
): Promise<SelectABTest | undefined> {
  const test = await db
    .select()
    .from(abTestsTable)
    .where(eq(abTestsTable.id, testId))
    .then((res) => {
      if (res.length > 0) {
        return res[0];
      }
      return undefined;
    });
  return test;
}

export async function getTestByTestId(
  testId: SelectABTest["id"]
): Promise<{ test: SelectABTest; reviews: SelectABTestReview[] } | undefined> {
  const abTest = await db
    .select()
    .from(abTestsTable)
    .where(eq(abTestsTable.id, testId))
    .then((res) => {
      if (res.length > 0) {
        return res[0];
      }
      return undefined;
    });
  if (abTest) {
    const reviews = await db
      .select()
      .from(abTestReviewsTable)
      .where(eq(abTestReviewsTable.abTestId, abTest.id));
    return {
      test: abTest,
      reviews: reviews,
    };
  }
  return undefined;
}
