// Authentication utility functions
import { config } from './config'

/**
 * Check if user is authenticated by reading cookies
 * @returns {boolean} - True if user is logged in
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  
  const authCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('isLoggedIn='))
  
  return authCookie ? authCookie.split('=')[1] === 'true' : false
}

/**
 * Get current user email from cookies
 * @returns {string|null} - User email or null if not logged in
 */
export function getCurrentUserEmail() {
  if (typeof window === 'undefined') return null
  
  const emailCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('userEmail='))
  
  return emailCookie ? decodeURIComponent(emailCookie.split('=')[1]) : null
}

/**
 * Set authentication cookies
 * @param {string} email - User email
 * @param {number} maxAge - Cookie max age in seconds (default: from config)
 */
export function setAuthCookies(email, maxAge = config.auth.cookieMaxAge) {
  document.cookie = `isLoggedIn=true; path=/; max-age=${maxAge}`
  document.cookie = `userEmail=${encodeURIComponent(email)}; path=/; max-age=${maxAge}`
  
  // Trigger storage event to update components
  window.dispatchEvent(new Event('storage'))
}

/**
 * Clear authentication cookies (logout)
 */
export function clearAuthCookies() {
  document.cookie = 'isLoggedIn=false; path=/; max-age=0'
  document.cookie = 'userEmail=; path=/; max-age=0'
  
  // Trigger storage event to update components
  window.dispatchEvent(new Event('storage'))
}

/**
 * Mock authentication function
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function authenticateUser(email, password) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (email === config.auth.mockCredentials.email && password === config.auth.mockCredentials.password) {
    return {
      success: true,
      message: 'Login successful'
    }
  } else {
    return {
      success: false,
      message: `Invalid email or password. Use ${config.auth.mockCredentials.email} / ${config.auth.mockCredentials.password}`
    }
  }
}

/**
 * Server-side authentication check for API routes
 * @param {Request} request - Next.js request object
 * @returns {boolean} - True if user is authenticated
 */
export function isAuthenticatedServer(request) {
  const cookies = request.headers.get('cookie') || ''
  const authCookie = cookies
    .split('; ')
    .find(row => row.startsWith('isLoggedIn='))
  
  return authCookie ? authCookie.split('=')[1] === 'true' : false
}