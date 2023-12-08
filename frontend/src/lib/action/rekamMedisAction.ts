import {
  CreateRekamMedisParams,
  DeleteRekamMedisParams,
  EditRekamMedisParams,
  GetAllRekamMedisParams,
  ShowRekamMedisParams,
} from "@/types";
import axios from "axios";
import { API_URL } from "./authAction";

export async function getAllRekamMedis(params: GetAllRekamMedisParams) {
  try {
    const { token, page = 1, orderBy, jenis_kelamin } = params;

    const response = await axios.get(
      `${API_URL}/rekammedis?page=${page}&orderBy=${orderBy}&jenis_kelamin=${
        jenis_kelamin || "all"
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

export async function createRekamMedis(params: CreateRekamMedisParams) {
  try {
    const { token, pendaftaran_id, keluhan, diagnosa, tindakan, keterangan } =
      params;

    const response = await axios.post(
      `${API_URL}/rekammedis`,
      {
        pendaftaran_id,
        keluhan,
        diagnosa,
        tindakan,
        keterangan,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 201) {
      throw new Error("Create rekam medis gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function showRekamMedis(params: ShowRekamMedisParams) {
  try {
    const { id, token } = params;
    const response = await axios.get(`${API_URL}/rekammedis/${id}`, {
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

export async function editRekamMedis(params: EditRekamMedisParams) {
  try {
    const {
      id,
      pendaftaran_id,
      keluhan,
      diagnosa,
      tindakan,
      keterangan,
      token,
    } = params;

    const response = await axios.put(
      `${API_URL}/rekammedis/${id}`,
      {
        pendaftaran_id,
        keluhan,
        diagnosa,
        tindakan,
        keterangan,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Edit rekam medis gagal");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteRekamMedis(params: DeleteRekamMedisParams) {
  try {
    const { id, token } = params;
    const response = await axios.delete(`${API_URL}/rekammedis/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Delete rekam medis gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
