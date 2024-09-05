import axios from "axios";

export const getAllTasks = async () => {
  const res = await axios("/api/task");
  const data = await res.data;

  return data;
};
