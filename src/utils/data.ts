import fs from "fs";
import { Project } from "@/types";

const GITHUB_API_URL = "https://api.github.com/users/NotKeira/repos";
const CACHE_FILE = "./cache.json";

const DEFAULT_CACHE = {
  lastUpdated: 0,
  projects: [],
};

const formatData = (data: any[]): Project[] => {
  if (!Array.isArray(data)) throw new Error("Invalid API response format.");

  return data.map((project) => ({
    id: project.id,
    title: project.name,
    description: project.description || "No description provided.",
    technologies: project.language ? [project.language] : [],
    link: project.html_url,
  }));
};

const saveToJson = (projects: Project[]) => {
  const cacheData = {
    lastUpdated: Math.floor(Date.now() / 1000), // Store timestamp in seconds
    projects,
  };

  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing cache file:", error);
  }
};

const readCache = (): { lastUpdated: number; projects: Project[] } => {
  try {
    if (!fs.existsSync(CACHE_FILE)) return DEFAULT_CACHE;

    const fileContent = fs.readFileSync(CACHE_FILE, "utf-8");
    if (!fileContent.trim()) return DEFAULT_CACHE; // Handle empty file
    const cache = JSON.parse(fileContent);

    if (
      typeof cache !== "object" ||
      typeof cache.lastUpdated !== "number" ||
      !Array.isArray(cache.projects)
    ) {
      throw new Error("Invalid cache format.");
    }

    return cache;
  } catch (error) {
    console.error("Error reading cache:", error);
    return DEFAULT_CACHE;
  }
};

const getProjects = async (): Promise<Project[]> => {
  try {
    const cache = readCache();

    if (Math.floor(Date.now() / 1000) - cache.lastUpdated < 3600) {
      return cache.projects;
    }

    const res = await fetch(GITHUB_API_URL);
    if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);

    const data = await res.json();
    const projects = formatData(data);
    saveToJson(projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default getProjects;
