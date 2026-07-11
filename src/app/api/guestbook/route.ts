import { NextResponse } from "next/server";
import { createGuestbookMessage, enforceGuestbookLimit } from "@/lib/appwriteServer";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Anti-spam configuration
const MAX_MESSAGES_PER_DAY = 3;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, avatarUrl } = body;

    if (!name || !message || !avatarUrl) {
      return NextResponse.json({ error: "Name, message, and avatar are required" }, { status: 400 });
    }

    if (name.length > 64) {
      return NextResponse.json({ error: "Name is too long (max 64)" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "Message is too long (max 500)" }, { status: 400 });
    }

    // 1. Anti-spam Check via Cookies
    const cookieStore = await cookies();
    const submissionCount = parseInt(cookieStore.get("guestbook_count")?.value || "0");
    const lastSubmission = cookieStore.get("guestbook_last")?.value;

    const now = new Date();
    // Reset count if it's a new day
    if (lastSubmission) {
      const lastDate = new Date(lastSubmission);
      if (lastDate.toDateString() !== now.toDateString() && submissionCount > 0) {
         cookieStore.set("guestbook_count", "0");
      }
    }

    // After possible reset, check count again
    const currentCount = parseInt(cookieStore.get("guestbook_count")?.value || "0");
    if (currentCount >= MAX_MESSAGES_PER_DAY) {
      return NextResponse.json(
        { error: `You have reached the limit of ${MAX_MESSAGES_PER_DAY} messages per day.` }, 
        { status: 429 }
      );
    }

    // Capture Vercel IP headers for the Globe feature
    const latitude = parseFloat(request.headers.get("x-vercel-ip-latitude") || "0");
    const longitude = parseFloat(request.headers.get("x-vercel-ip-longitude") || "0");

    // 2. Save to Appwrite
    const result = await createGuestbookMessage({
      name,
      message,
      avatarUrl,
      ...(latitude && longitude ? { latitude, longitude } : {})
    });

    // 3. Update Cookies
    cookieStore.set("guestbook_count", (currentCount + 1).toString(), { maxAge: 60 * 60 * 24 }); // 1 day
    cookieStore.set("guestbook_last", now.toISOString(), { maxAge: 60 * 60 * 24 });

    // 4. Invalidate Next.js cache so the new message appears immediately
    revalidatePath("/guestbook");

    // 5. Fire and forget rolling deletion in the background 
    // (Wait, serverless functions might freeze before this finishes. Let's await it to be safe, but with a small limit so it's fast).
    // Using a limit of 40,000 to keep it well under 50MB
    await enforceGuestbookLimit(40000);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error("Guestbook API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
