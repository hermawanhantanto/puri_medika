import useAxios from ".";

export const GetMyFavorite = async () => {
  const id = JSON.parse(sessionStorage.getItem("user")).id;
  try {
    const response = await useAxios.get(`/favourites/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreateFavorite = async (data) => {
  try {
    const response = await useAxios.post("/favourites", data, {
      headers: {
        "Content-Type": "application/json", // untuk upload thumbnail
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeleteFavorite = async (id) => {
  console.log(id);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await useAxios.delete(`/favourites/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
