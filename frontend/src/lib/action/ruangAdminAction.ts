import {
  CreateRuangParams,
  DeleteRuangParams,
  EditRuangParams,
  GetAllRuangParams,
  ShowDokterParams,
} from "@/types";
import axios from "axios";
import { API_URL } from "./authAction";

export async function getAllRuang(params: GetAllRuangParams) {
  try {
    console.log(params);
    const { token, page = 1, orderBy, status } = params;
    const response = await axios.get(
      `${API_URL}/ruangs?page=${page}&orderBy=${orderBy}&status=${status}`,
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

export async function createRuang(params: CreateRuangParams) {
  try {
    const { token, nama, keterangan, kapasitas, status } = params;
    const response = await axios.post(
      `${API_URL}/ruangs`,
      {
        nama,
        keterangan,
        kapasitas,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 201) {
      throw new Error("Create ruang gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function showRuang(params: ShowDokterParams) {
  try {
    const { id, token } = params;
    const response = await axios.get(`${API_URL}/ruangs/${id}`, {
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

export async function editRuang(params: EditRuangParams) {
  try {
    const { id, nama, keterangan, kapasitas, status, token } = params;
    console.log(params);

    const response = await axios.put(
      `${API_URL}/ruangs/${id}`,
      {
        nama,
        keterangan,
        kapasitas,
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
      throw new Error("Edit ruang gagal");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteRuang(params: DeleteRuangParams) {
  try {
    const { id, token } = params;
    const response = await axios.delete(`${API_URL}/ruangs/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Delete ruang gagal");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
