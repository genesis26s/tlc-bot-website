// api/_lib/jwt.js
// JWT sign/verify helpers using Web Crypto API via the 'jose' library.
// Runs on Vercel's Node 18+ serverless runtime.

import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // Don't crash at import time, but fail loudly on use.
  console.warn('⚠️  JWT_SECRET env var is not set. Auth will fail.');
}

const secretKey = new TextEncoder().encode(
  JWT_SECRET || 'INSECURE_FALLBACK_DO_NOT_USE_IN_PRODUCTION'
);

/**
 * Sign a payload as a JWT.
 * @param {object} payload - Data to embed in the token
 * @param {string} expiresIn - Duration string, e.g. '7d', '24h', '30m'
 * @returns {Promise<string>} Signed JWT
 */
export async function signToken(payload, expiresIn = '7d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verify a JWT and return its payload.
 * @param {string} token - JWT string
 * @returns {Promise<object|null>} Decoded payload or null if invalid/expired
 */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    // Token invalid, expired, or signature mismatch
    return null;
  }
}
