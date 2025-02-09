/**
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/", "/guest/new-verification"];

/**
 * These routes are used for authentication.
 * These routes will redirect logged users to protected routes.
 * @type {string[]}
 */

export const authRoutes: string[] = ["/guest/Login", "/guest/Register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api";

/**
 * Default redirect path after user has logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/auth/dashboard";
