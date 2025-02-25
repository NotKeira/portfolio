
import type { NextApiRequest, NextApiResponse } from "next";
import projects from "@/utils/data";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = await projects;
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching projects: ${error}`);
        res.status(500).json({ status: "Error", message: "Failed to fetch projects." });
    }
}