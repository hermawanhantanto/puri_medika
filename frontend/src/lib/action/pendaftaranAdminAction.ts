import {
  CreatePendaftaranParams,
  DeletePendaftaranParams,
  EditPendaftaranParams,
  GetAllPendaftaranParams,
  ShowPendaftaranParams,
} from "@/types";
import axios from "axios";
import { API_URL } from "./authAction";

export async function getAllPendaftaran(params: GetAllPendaftaranParams) {
  try {
    const { token, page = 1, orderBy, status } = params;

    const response = await axios.get(
      `${API_URL}/pendaftarans?page=${page}&orderBy=${orderBy}&status=${
        status || "all"
      }`,
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

export async function createPendaftaran(params: CreatePendaftaranParams) {
  try {
    const { token, user_id, ruang_id, dokter_id, tanggal_pendaftaran, status } =
      params;

    const tanggal = tanggal_pendaftaran.toISOString().split("T")[0];

    const response = await axios.post(
      `${API_URL}/pendaftarans`,
      {
        user_id,
        ruang_id,
        dokter_id,
        tanggal_pendaftaran: tanggal,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const { response } = error as object as {
      response: { data: { message: string } };
    };
    throw response.data.message;
  }
}

export async function showPendaftaran(params: ShowPendaftaranParams) {
  try {
    const { id, token } = params;
    const response = await axios.get(`${API_URL}/pendaftarans/${id}`, {
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

export async function editPendaftaran(params: EditPendaftaranParams) {
  try {
    const {
      id,
      user_id,
      ruang_id,
      dokter_id,
      tanggal_pendaftaran,
      status,
      token,
    } = params;

    const tanggal = tanggal_pendaftaran.toISOString().split("T")[0];

    const response = await axios.put(
      `${API_URL}/pendaftarans/${id}`,
      {
        user_id,
        ruang_id,
        dokter_id,
        tanggal_pendaftaran: tanggal,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Edit pendaftaran gagal");
    }

    return response.data;
  } catch (error) {
    const { response } = error as object as {
      response: { data: { message: string } };
    };
    throw response.data.message;
  }
}

export async function deletePendaftaran(params: DeletePendaftaranParams) {
  try {
    const { id, token } = params;
    const response = await axios.delete(`${API_URL}/pendaftarans/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Delete pendaftaran gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
