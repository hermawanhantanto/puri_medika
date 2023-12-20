import axios from "axios";
import { API_URL } from "./authAction";
import {
  GetAllPasienParams,
  deletePasienParams,
  editPasienParams,
  showPasienParams,
} from "@/types";

export async function getAllPasien(params: GetAllPasienParams) {
  try {
    const { token, page = 1, orderBy, jenis_kelamin } = params;
    const response = await axios.get(
      `${API_URL}/pasiens?page=${page}&orderBy=${orderBy}&jenis_kelamin=${jenis_kelamin}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function showPasien(params: showPasienParams) {
  try {
    const { id, token } = params;
    const response = await axios.get(`${API_URL}/pasiens/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editPasien(params: editPasienParams) {
  try {
    const {
      id,
      nama,
      email,
      password,
      nomor_identitas,
      jenis_kelamin,
      tanggal_lahir,
      nomor_telepon,
      alamat,
      token,
      image,
    } = params;
    const tanggal = tanggal_lahir.toISOString().split("T")[0];
    const response = await axios.put(
      `${API_URL}/pasiens/${id}`,
      {
        nama,
        email,
        password,
        nomor_identitas,
        jenis_kelamin,
        tanggal_lahir: tanggal,
        nomor_telepon,
        alamat,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Edit pasien gagal");
    }

    return response.data;
  } catch (error) {
    const { response } = error as object as {
      response: { data: { message: string } };
    };
    throw response.data.message;
  }
}

export async function deletePasien(params: deletePasienParams) {
  try {
    const { id, token } = params;
    const response = await axios.delete(`${API_URL}/pasiens/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Delete pasien gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
