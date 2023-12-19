import axios from "axios";
import { API_URL } from "./authAction";
import console from "console";

export async function getPendaftaranByUser({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  try {
    const response = await axios.get(`${API_URL}/pendaftaranProfile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error(response.statusText);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRekamMedisByUser({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  try {
    const response = await axios.get(`${API_URL}/rekamMedisProfile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) throw new Error(response.statusText);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
