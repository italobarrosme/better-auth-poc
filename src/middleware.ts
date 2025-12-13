import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/modules/authentication/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next|static|favicon.ico).*)", "/dashboard"],
};
