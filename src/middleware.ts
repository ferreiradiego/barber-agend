export { auth as middleware } from "@/auth"

//  This middleware will redirect to the signin page if the user is not authenticated.
// import { auth } from "@/auth";
// export default auth((req) => {
//   if (
//     !req.auth &&
//     req.nextUrl.pathname !== "/signin" &&
//     req.nextUrl.pathname !== "/signup"
//   ) {
//     const newUrl = new URL("/signin", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
