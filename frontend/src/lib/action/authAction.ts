import { loginParams, registerParams } from "@/types";
import axios from "axios";

export const API_URL = "http://localhost:8000/api";

export const signInAccount = async (user: loginParams) => {
  try {
    const { email, password } = user;
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.status !== 200) throw new Error(response.statusText);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUpAccount = async (user: registerParams) => {
  try {
    const {
      nama,
      email,
      password,
      nomor_identitas,
      jenis_kelamin,
      tanggal_lahir,
      nomor_telepon,
      alamat,
    } = user;
    const tanggal = tanggal_lahir.toISOString().split("T")[0];
    const response = await axios.post(`${API_URL}/register`, {
      nama,
      email,
      password,
      nomor_identitas,
      jenis_kelamin,
      tanggal_lahir: tanggal,
      nomor_telepon,
      alamat,
    });

    if (response.status !== 201) throw new Error(response.statusText);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
