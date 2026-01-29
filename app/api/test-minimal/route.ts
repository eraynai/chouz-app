import { authTest } from "@/lib/auth-test";

export const GET = async () => {
  const api = (authTest as any).api || {};
  const routes = Object.keys(api);
  
  return Response.json({
    message: "Minimal test auth instance",
    totalRoutes: routes.length,
    availableRoutes: routes,
    hasMagicLink: routes.some(r => r.includes('magic')),
  });
};
