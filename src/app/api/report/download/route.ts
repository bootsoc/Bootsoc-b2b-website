import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { get } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { report } from "@/content/report";
import { verifyReportToken } from "@/lib/report-token";

async function loadReport(): Promise<BodyInit | null> {
  // Production: the PDF lives in a private Vercel Blob store, so it can't be fetched without this route.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const res = await get(`reports/${report.file}`, { access: "private" }).catch(() => null);
    if (res?.statusCode === 200) return res.stream;
  }
  // Local development: the generated PDF in /private (gitignored, never committed to the public repo).
  try {
    return new Blob([new Uint8Array(await readFile(join(process.cwd(), "private", report.file)))], { type: "application/pdf" });
  } catch {
    return null;
  }
}

/** Streams the gated report PDF when the signed token is valid. */
export async function GET(request: NextRequest) {
  if (!verifyReportToken(request.nextUrl.searchParams.get("t"))) {
    return NextResponse.redirect(new URL("/report?expired=1", request.url));
  }
  const body = await loadReport();
  if (!body) return NextResponse.json({ error: "Report temporarily unavailable" }, { status: 503 });
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${report.file}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
