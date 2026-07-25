/**
 * MathSpark — Auth Service
 * All API calls related to authentication.
 * Pages/components should call these functions — never fetch('/api/auth/...') directly.
 */

/**
 * Log in with phone + password.
 * @param {string} phone
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function login(phone, password) {
  const res = await fetch('/api/auth/login', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ phone, password }),
  });
  return res.json();
}

/**
 * Register a new student account.
 * @param {object} data - { name, phone, password, grade, medium }
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function register(data) {
  const res = await fetch('/api/auth/register', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  return res.json();
}

/**
 * Get the currently authenticated user from the JWT cookie.
 * @returns {Promise<{user?: object, error?: string}>}
 */
export async function getMe() {
  const res = await fetch('/api/auth/me');
  if (!res.ok) return { user: null };
  return res.json();
}
