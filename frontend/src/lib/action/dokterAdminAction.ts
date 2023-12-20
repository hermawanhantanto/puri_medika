import {
  CreateDokterParams,
  DeleteDokterParams,
  EditDokterParams,
  GetAllDokterParams,
  ShowDokterParams,
} from "@/types";
import axios from "axios";
import { API_URL } from "./authAction";

export async function getAllDokter(params: GetAllDokterParams) {
  try {
    const { token, page = "", orderBy = "", jenis_kelamin = "" } = params;
    const response = await axios.get(
      `${API_URL}/dokters?page=${page}&orderBy=${orderBy}&jenis_kelamin=${jenis_kelamin}`,
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

export async function createDokter(params: CreateDokterParams) {
  try {
    const {
      token,
      nama,
      spesialis,
      jenis_kelamin,
      no_telp,
      alamat,
      nomor_izin_praktek,
      gambar,
    } = params;
    const response = await axios.post(
      `${API_URL}/dokters`,
      {
        nama,
        spesialis,
        jenis_kelamin,
        no_telp,
        alamat,
        nomor_izin_praktek,
        gambar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 201) {
      throw new Error("Create dokter gagal");
    }
    return response.data;
  } catch (error) {
    const { response } = error as object as {
      response: { data: { message: string } };
    };
    throw response.data.message;
  }
}

export async function showDokter(params: ShowDokterParams) {
  try {
    const { id, token } = params;
    const response = await axios.get(`${API_URL}/dokters/${id}`, {
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

export async function editDokter(params: EditDokterParams) {
  try {
    const {
      id,
      nama,
      spesialis,
      jenis_kelamin,
      no_telp,
      alamat,
      nomor_izin_praktek,
      token,
      gambar,
    } = params;
    console.log(params);

    const response = await axios.put(
      `${API_URL}/dokters/${id}`,
      {
        nama,
        spesialis,
        jenis_kelamin,
        no_telp,
        alamat,
        nomor_izin_praktek,
        gambar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Edit dokter gagal");
    }

    return response.data;
  } catch (error) {
    const { response } = error as object as {
      response: { data: { message: string } };
    };
    throw response.data.message;
  }
}

export async function deleteDokter(params: DeleteDokterParams) {
  try {
    const { id, token } = params;
    const response = await axios.delete(`${API_URL}/dokters/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Delete dokter gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
