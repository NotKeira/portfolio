import type { NextApiRequest, NextApiResponse } from "next";

const url: string = process.env.DISCORD_WEBHOOK_URL as string;
if (!url) {
  throw new Error(`The Webhook URL is not defined or is unavailable.`);
}

// Store submission timestamps (Use Redis for persistence)
const ipCooldowns = new Map<string, number>();
const COOLDOWN_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "Error", message: "Method not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "Unknown";

  if (!ip) {
    return res
      .status(400)
      .json({ status: "Error", message: "Could not determine IP" });
  }

  const lastSubmissionTime = ipCooldowns.get(ip);
  const now = Date.now();

  if (lastSubmissionTime && now - lastSubmissionTime < COOLDOWN_TIME) {
    return res
      .status(429)
      .json({
        status: "Error",
        message: "You can only submit once every 30 minutes.",
      });
  }

  // Store the new submission timestamp
  ipCooldowns.set(ip, now);

  try {
    const {
      title,
      description,
      colour,
    }: { title: string; description: string; colour: any } = req.body;
    const embed = {
      title: title || "Website Contact Form",
      description: description || "A user has submitted a form on the website.",
      color: colour || 3447003,
    };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "<@801384603704623115>",
        embeds: [embed],
      }),
    });

    return res
      .status(200)
      .json({ status: "Success", message: "Form submitted successfully." });
  } catch (error) {
    console.error(`Error sending message to Discord: ${error}`);
    return res
      .status(500)
      .json({ status: "Error", message: "Failed to send embed." });
  }
}
