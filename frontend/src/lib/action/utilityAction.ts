import axios from "axios";
import { API_URL } from "./authAction";

export async function getCountPasien(token: string) {
  try {
    const response = await axios.get(`${API_URL}/countPasien`, {
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

export async function getCountDokter(token: string) {
  try {
    const response = await axios.get(`${API_URL}/countDokter`, {
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

export async function getCountRuang(token: string) {
  try {
    const response = await axios.get(`${API_URL}/countRuang`, {
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

export async function getCountPendaftaran(token: string) {
  try {
    const response = await axios.get(`${API_URL}/countPendaftaran`, {
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

export async function getCountRekamMedis(token: string) {
  try {
    const response = await axios.get(`${API_URL}/countRekamMedis`, {
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

export async function getRecentPasien(token: string) {
  try {
    const response = await axios.get(`${API_URL}/recentPasien`, {
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
