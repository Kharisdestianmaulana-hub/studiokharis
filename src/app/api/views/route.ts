import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") === "up" ? "/up" : "";
    
    // Proxy request to the global counter API
    const res = await fetch(`https://api.counterapi.dev/v1/studiokharis/views${action}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch counter" }, { status: 500 });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
