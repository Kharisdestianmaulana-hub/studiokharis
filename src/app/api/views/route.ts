import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") === "up" ? "/up" : "";
    
    // Proxy request to the global counter API v2
    const res = await fetch(`https://api.counterapi.dev/v2/kharis-destian-maulanas-team-5266/visitor-counter-kharis${action}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch counter" }, { status: 500 });
    }
    
    const json = await res.json();
    
    // counterapi v2 returns data inside a nested object and uses up_count
    const count = json?.data?.up_count || 0;
    
    return NextResponse.json({ count }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
