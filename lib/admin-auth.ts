import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "fha_admin_session";

function expectedTokenHash(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(password).digest("hex");
}

export function isValidPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

export function sessionTokenValue(): string {
  return expectedTokenHash();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return false;
  return session === expectedTokenHash();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;