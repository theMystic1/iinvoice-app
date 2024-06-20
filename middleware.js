import { auth } from "./app/_lib/auth";

export const middleware = auth;

//3. selecct the routes to protect
export const config = {
  matcher: ["/"],
};
