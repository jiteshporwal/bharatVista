export const ADMIN_COOKIE_NAME = "bv_admin_session";
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "bharatvista-default-session-secret-change-in-production-32b"
  );
}

// Convert base64url to Uint8Array
function base64UrlToUint8Array(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Convert Uint8Array to base64url
function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getHmacKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

/**
 * Sign an admin session token using HMAC-SHA256
 */
export async function signAdminSession(email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email,
    role: "admin",
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
  };

  const payloadStr = JSON.stringify(payload);
  const payloadBytes = new TextEncoder().encode(payloadStr);
  const payloadB64 = uint8ArrayToBase64Url(payloadBytes);

  const key = await getHmacKey(getSecretKey(), "sign");
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64)
  );
  const signatureB64 = uint8ArrayToBase64Url(new Uint8Array(signatureBuffer));

  return `${payloadB64}.${signatureB64}`;
}

/**
 * Verify an admin session token
 */
export async function verifyAdminSession(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signatureB64] = parts;

  try {
    const key = await getHmacKey(getSecretKey(), "verify");
    const signatureBytes = base64UrlToUint8Array(signatureB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as BufferSource,
      new TextEncoder().encode(payloadB64)
    );

    if (!valid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlToUint8Array(payloadB64));
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates provided credentials against server environment configuration
 */
export function validateAdminCredentials(
  identifier: string,
  secret: string
): boolean {
  const validEmail = (process.env.ADMIN_EMAIL || "admin@bharatvista.com").trim().toLowerCase();
  const validPassword = (process.env.ADMIN_PASSWORD || "BharatVista@Admin2026").trim();

  const inputIdentifier = identifier.trim().toLowerCase();
  const inputSecret = secret.trim();

  // Allow either full email or the username part before @
  const isUsernameMatch =
    inputIdentifier === validEmail ||
    inputIdentifier === validEmail.split("@")[0] ||
    inputIdentifier === "admin";

  const isPasswordMatch = inputSecret === validPassword;

  return isUsernameMatch && isPasswordMatch;
}

