/**
 * AN array of routes that are accessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/about",
  "/contact",
  "/explore",
  "/pricing",
  "/:path*",
  "/new-verification",
];

/**
 * An array of routes that are used for authentication
 * These routes are used for login and will redirect logged in user to /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/forgot",
  "/reset-password",
];

/**
 * Rout prefix for the api auth routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * An array of routes that are protected and require authentication
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/dashboard",
  "/dashboard/user",
  "/dashboard/analytics",
  "/dashboard/settings",
  "dashboard/billing",
];

/**
 * An array of routes that are protected and require authentication
 * @type {string[]}
 */
export const adminRoutes: string[] = ["/admin"];

/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
