import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isProtectedRoute = createRouteMatcher([
  "/completed(.*)",
  "/todo(.*)",
]);

export default clerkMiddleware((auth, request) => {

  if (!auth().userId && isProtectedRoute(request)) {
    // Add custom logic to run before redirecting

    return auth().redirectToSignIn()
  }
});
