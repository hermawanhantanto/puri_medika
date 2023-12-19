import {
  CreateDokterParams,
  CreatePendaftaranParams,
  CreateRekamMedisParams,
  CreateRuangParams,
  DeleteDokterParams,
  DeletePendaftaranParams,
  DeleteRekamMedisParams,
  DeleteRuangParams,
  EditDokterParams,
  EditPendaftaranParams,
  EditRekamMedisParams,
  EditRuangParams,
  GetAllPasienParams,
  GetAllPendaftaranParams,
  GetAllRekamMedisParams,
  GetAllRuangParams,
  ShowDokterParams,
  ShowPendaftaranParams,
  ShowRekamMedisParams,
  ShowRuangParams,
  deletePasienParams,
  editPasienParams,
  loginParams,
  registerParams,
  showPasienParams,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signInAccount, signUpAccount } from "../action/authAction";
import {
  createDokter,
  deleteDokter,
  editDokter,
  getAllDokter,
  showDokter,
} from "../action/dokterAdminAction";
import {
  deletePasien,
  editPasien,
  getAllPasien,
  showPasien,
} from "../action/pasienAdminAction";
import {
  createRuang,
  deleteRuang,
  editRuang,
  getAllRuang,
  showRuang,
} from "../action/ruangAdminAction";
import {
  createPendaftaran,
  deletePendaftaran,
  editPendaftaran,
  getAllPendaftaran,
  showPendaftaran,
} from "../action/pendaftaranAdminAction";
import {
  createRekamMedis,
  deleteRekamMedis,
  editRekamMedis,
  getAllRekamMedis,
  showRekamMedis,
} from "../action/rekamMedisAction";
import {
  getCountDokter,
  getCountPasien,
  getCountPendaftaran,
  getCountRekamMedis,
  getCountRuang,
  getRecentPasien,
} from "../action/utilityAction";
import {
  getPendaftaranByUser,
  getRekamMedisByUser,
} from "../action/profileAction";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (user: loginParams) => signInAccount(user),
  });
};

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: registerParams) => signUpAccount(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPasien", "countPasien", "getRecentPasien"],
      });
    },
  });
};

export const useGetAllPasien = (params: GetAllPasienParams) => {
  return useQuery({
    queryKey: ["getAllPasien"],
    queryFn: () => getAllPasien(params),
  });
};

export const useShowPasien = (params: showPasienParams) => {
  return useQuery({
    queryKey: ["showPasien"],
    queryFn: () => showPasien(params),
    staleTime: 0,
  });
};

export const useEditPasienMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: editPasienParams) => editPasien(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPasien"],
      });
    },
  });
};

export const useDeletePasienMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: deletePasienParams) => deletePasien(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPasien", "countPasien", "getRecentPasien"],
      });
    },
  });
};

export const useGetAllDokter = (params: GetAllPasienParams) => {
  return useQuery({
    queryKey: ["getAllDokter"],
    queryFn: () => getAllDokter(params),
  });
};

export const useCreateDokterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dokter: CreateDokterParams) => createDokter(dokter),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllDokter", "countDokter"],
      });
    },
  });
};

export const useShowDokter = (params: ShowDokterParams) => {
  return useQuery({
    queryKey: ["showDokter"],
    queryFn: () => showDokter(params),
    staleTime: 0,
  });
};

export const useEditDokterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dokter: EditDokterParams) => editDokter(dokter),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllDokter"],
      });
    },
  });
};

export const useDeleteDokterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dokter: DeleteDokterParams) => deleteDokter(dokter),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllDokter", "countDokter"],
      });
    },
  });
};

export const useGetAllRuang = (params: GetAllRuangParams) => {
  return useQuery({
    queryKey: ["getAllRuang"],
    queryFn: () => getAllRuang(params),
  });
};

export const useCreateRuangMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruang: CreateRuangParams) => createRuang(ruang),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRuang", "countRuang"],
      });
    },
  });
};

export const useShowRuang = (params: ShowRuangParams) => {
  return useQuery({
    queryKey: ["showRuang"],
    queryFn: () => showRuang(params),
    staleTime: 0,
  });
};

export const useEditRuangMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruang: EditRuangParams) => editRuang(ruang),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRuang"],
      });
    },
  });
};

export const useDeleteRuangMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ruang: DeleteRuangParams) => deleteRuang(ruang),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRuang", "countRuang"],
      });
    },
  });
};

//-----------------------------------------------------------------------------
export const useGetAllRekamMedis = (params: GetAllRekamMedisParams) => {
  return useQuery({
    queryKey: ["getAllRekamMedis"],
    queryFn: () => getAllRekamMedis(params),
    retryDelay: 1000,
  });
};

export const useCreateRekamMedisMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rekamMedis: CreateRekamMedisParams) =>
      createRekamMedis(rekamMedis),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRekamMedis", "countRekamMedis"],
      });
    },
  });
};

export const useShowRekamMedis = (params: ShowRekamMedisParams) => {
  return useQuery({
    queryKey: ["showRekamMedis"],
    queryFn: () => showRekamMedis(params),
    staleTime: 0,
  });
};

export const useEditRekamMedisMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rekamMedis: EditRekamMedisParams) =>
      editRekamMedis(rekamMedis),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRekamMedis", "countRekamMedis"],
      });
    },
  });
};

export const useDeleteRekamMedisMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rekamMedis: DeleteRekamMedisParams) =>
      deleteRekamMedis(rekamMedis),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRekamMedis", "countRekamMedis"],
      });
    },
  });
};

//-----------------------------------------------------------------------------
export const useGetAllPendaftaran = (params: GetAllPendaftaranParams) => {
  return useQuery({
    queryKey: ["getAllPendaftaran"],
    queryFn: () => getAllPendaftaran(params),
    retryDelay: 1000,
  });
};

export const useCreatePendaftaranMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pendaftaran: CreatePendaftaranParams) =>
      createPendaftaran(pendaftaran),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPendaftaran", "countPendaftaran"],
      });
    },
  });
};

export const useShowPendaftaran = (params: ShowPendaftaranParams) => {
  return useQuery({
    queryKey: ["showPendaftaran"],
    queryFn: () => showPendaftaran(params),
    staleTime: 0,
  });
};

export const useEditPendaftaranMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pendaftaran: EditPendaftaranParams) =>
      editPendaftaran(pendaftaran),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPendaftaran", "countPendaftaran"],
      });
    },
  });
};

export const useDeletePendaftaranMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pendaftaran: DeletePendaftaranParams) =>
      deletePendaftaran(pendaftaran),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllPendaftaran", "countPendaftaran"],
      });
    },
  });
};

//-----------------------------------------------------------------------------
export const useCountPasien = (token: string) => {
  return useQuery({
    queryKey: ["countPasien"],
    queryFn: () => getCountPasien(token),
  });
};

export const useCountDokter = (token: string) => {
  return useQuery({
    queryKey: ["countDokter"],
    queryFn: () => getCountDokter(token),
  });
};

export const useCountRuang = (token: string) => {
  return useQuery({
    queryKey: ["countRuang"],
    queryFn: () => getCountRuang(token),
  });
};

export const useCountPendaftaran = (token: string) => {
  return useQuery({
    queryKey: ["countPendaftaran"],
    queryFn: () => getCountPendaftaran(token),
  });
};

export const useCountRekamMedis = (token: string) => {
  return useQuery({
    queryKey: ["countRekamMedis"],
    queryFn: () => getCountRekamMedis(token),
  });
};

export const useGetRecentPasien = (token: string) => {
  return useQuery({
    queryKey: ["getRecentPasien"],
    queryFn: () => getRecentPasien(token),
  });
};

export const useGetAllRekamMedisByUser = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  return useQuery({
    queryKey: ["getAllRekamMedisByUser"],
    queryFn: () =>
      getRekamMedisByUser({
        token,
        id,
      }),
  });
};

export const useGetAllPendaftaranByUser = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  return useQuery({
    queryKey: ["getAllPendaftaranByUser"],
    queryFn: () =>
      getPendaftaranByUser({
        token,
        id,
      }),
  });
};
