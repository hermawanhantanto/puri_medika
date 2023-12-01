import { loginParams } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const signInAccount = async (user: loginParams) => {
  try {
    const { email, password } = user;
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.status !== 200) throw new Error(response.statusText);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
