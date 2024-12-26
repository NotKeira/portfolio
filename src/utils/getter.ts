import data from "./data";

export const getProjectById = async (id: string) => {
  return data.find((proj) => proj.id === id);
};
