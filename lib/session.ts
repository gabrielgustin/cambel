import { createHmac, timingSafeEqual } from "crypto"

// The cookie holds "<userId>.<HMAC>", so a visitor cannot invent a valid one.
// shortcut: falls back to POSTGRES_URL (already a server-only secret in Vercel); set SESSION_SECRET to decouple from the DB password.
const secret = () => process.env.SESSION_SECRET || process.env.POSTGRES_URL || ""

const sign = (userId: string) => createHmac("sha256", secret()).update(userId).digest("base64url")

export function signSession(userId: number | string): string {
  if (!secret()) throw new Error("SESSION_SECRET no configurado")
  return `${userId}.${sign(String(userId))}`
}

/** Returns the user id if the cookie is authentic, otherwise null. */
export function verifySession(value: string | undefined): number | null {
  if (!value || !secret()) return null
  const [userId, sig] = value.split(".")
  if (!/^\d+$/.test(userId ?? "") || !sig) return null
  const expected = Buffer.from(sign(userId))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given) ? Number(userId) : null
}
