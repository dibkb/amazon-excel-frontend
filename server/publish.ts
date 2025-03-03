"use server";

import { ProductEnhancements } from "@/app/store/productStore";
import { Product } from "@/src/api/models/Product";
import { db } from "@/src/db";
import { abTestsTable } from "@/src/schema";

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
