import { NextResponse, type NextRequest } from "next/server";
import { GEO_COOKIE, regimeFor } from "@/lib/consent";

/**
 * Tags each visitor with their cookie-consent regime (opt-in vs opt-out) from Vercel's geo headers,
 * so pages can stay fully static while the consent banner still behaves correctly per jurisdiction.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.has(GEO_COOKIE)) {
    const country = request.headers.get("x-vercel-ip-country");
    const region = request.headers.get("x-vercel-ip-country-region");
    const regime = regimeFor(country, region);
    response.cookies.set(GEO_COOKIE, `${regime}.${country ?? "XX"}${region ? `-${region}` : ""}`, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|studio|_next/static|_next/image|images|logos|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|llms.txt).*)"],
};
