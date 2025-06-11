import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Publicly accessible routes
        const publicPaths = [
          '/',
          '/login',
          '/register'
        ];

        const publicPrefixes = [
          '/new-cars'
        ];

        const isPublic = publicPaths.includes(pathname) ||
          publicPrefixes.some(prefix => pathname.startsWith(prefix));

        // Allow public routes even if not authenticated
        if (isPublic) return true;

        // Block all other routes if not authenticated
        return !!token;
      }
    }
  }
);
