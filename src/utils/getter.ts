import fs from "fs";
import { Project } from "@/types";

const CACHE_FILE = "./cache.json";

const readCache = (): { projects: Project[] } => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return { projects: [] };
    const fileContent = fs.readFileSync(CACHE_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading cache:", error);
    return { projects: [] };
  }
};

const { projects: data } = readCache();

export const getProjectById = async (id: number) => {
  return data.find((project) => project.id === (id as number));
};
