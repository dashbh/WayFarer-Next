import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { level, message, details } = await req.json();

  console.log(`[SERVER] [${level.toUpperCase()}]`, message, details);

  // Forward to Grafana Loki
  await fetch("https://logs-prod-028.grafana.net", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      streams: [
        {
          stream: { level },
          values: [
            [`${Date.now()}000000`, `${message} ${JSON.stringify(details)}`],
          ],
        },
      ],
    }),
  }).catch(console.error);

  return NextResponse.json({ success: true });
}
