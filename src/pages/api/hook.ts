import type { NextApiRequest, NextApiResponse } from "next";
const url: string = process.env.DISCORD_WEBHOOK_URL as string;

if (!url) {
  throw new Error(`The Webhook URL is not defined or is unavailable.`);
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      title,
      description,
      colour,
    }: { title: string; description: string; colour: any } = req.body;
    const embed: { title: string; description: string; color: any } = {
      title: title || "Website Contact Form",
      description: description || "A user has submitted a form on the website.",
      color: colour || 3447003,
    };

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "<@801384603704623115>",
        embeds: [embed],
      }),
    });
    res.status(200).json({ status: "Success" });
  } catch (error) {
    console.error(`Error sending message to Discord: ${error}`);
    res.status(500).json({ status: "Error", message: "Failed to send embed." });
  }
}
