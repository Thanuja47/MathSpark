import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'mathspark_dev_secret_2026_change_in_production';
const JWT_EXPIRES = '7d';

// ── Token Utilities ──────────────────────────────────────────────────
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// ── Password Utilities ───────────────────────────────────────────────
export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// ── Cookie Header Helper ─────────────────────────────────────────────
export function setAuthCookie(token) {
  return `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
}

export function clearAuthCookie() {
  return `auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

// ── Get user from request cookies ────────────────────────────────────
export function getUserFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/auth_token=([^;]+)/);
  if (!match) return null;
  return verifyToken(match[1]);
}
