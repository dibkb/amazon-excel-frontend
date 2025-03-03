import { db } from "@/src/db";

import { abTestsTable, SelectABTest, SelectUser } from "@/src/schema";
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
