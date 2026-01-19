import { NextResponse } from "next/server";

type SubscribeRequestBody = {
  email?: unknown;
  name?: unknown;
};

type MailerLiteErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readResponseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json().catch(() => null);
  }
  return res.text().catch(() => null);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubscribeRequestBody;

    const emailRaw = body.email;
    const nameRaw = body.name;

    const email =
      typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";

    const name = typeof nameRaw === "string" ? nameRaw.trim() : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILERLITE_API_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey || !groupId) {
      return NextResponse.json(
        { error: "MailerLite env vars are missing." },
        { status: 500 }
      );
    }

    const groupIdClean = groupId.trim();
    if (!/^\d+$/.test(groupIdClean)) {
      return NextResponse.json(
        { error: "MAILERLITE_GROUP_ID must be a numeric ID string." },
        { status: 500 }
      );
    }

    const payload: {
      email: string;
      groups: string[];
      fields?: { name: string };
    } = {
      email,
      groups: [groupIdClean],
    };

    if (name) {
      payload.fields = { name };
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const details = await readResponseBody(res);

      // Optional: if the API returned JSON, you can try to shape it for nicer debugging
      const parsed =
        typeof details === "object" && details !== null
          ? (details as MailerLiteErrorResponse)
          : undefined;

      return NextResponse.json(
        {
          error: "MailerLite request failed.",
          status: res.status,
          details: parsed ?? details,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    // Keep this string conversion to avoid lint complaints about unknown error types
    return NextResponse.json(
      { error: "Unexpected error.", details: String(err) },
      { status: 500 }
    );
  }
}
