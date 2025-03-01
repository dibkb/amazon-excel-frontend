import { db } from "@/src/db";
import { SelectUser } from "@/src/schema";

import { usersTable } from "@/src/schema";
import { eq } from "drizzle-orm";
export async function getUserByUsername(
  username: SelectUser["username"]
): Promise<SelectUser | undefined> {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .then((res) => {
      if (res.length > 0) {
        return res[0];
      }
      return undefined;
    });
  return user;
}
