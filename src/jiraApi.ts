import axios from "axios";
import { LoginData } from "./utils/types";

const baseURL = "";

export const login = async ({
  password,
  username,
}: LoginData): Promise<string> => {
  const response = await axios.post<string>(
    "auth/1/session",
    {
      username,
      password,
    },
    { baseURL }
  );

  return response.data;
};
