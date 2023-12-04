import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signInAccount, signUpAccount } from "../action/authAction";
import {
  deletePasien,
  editPasien,
  getAllPasien,
  showPasien,
} from "../action/pasienAdminAction";
import {
  deletePasienParams,
  editPasienParams,
  loginParams,
  registerParams,
  showPasienParams,
} from "@/types";

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
        queryKey: ["getAllPasien"],
      });
    },
  });
};

export const useGetAllPasien = (token: string) => {
  return useQuery({
    queryKey: ["getAllPasien"],
    queryFn: () => getAllPasien(token),
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
        queryKey: ["getAllPasien"],
      });
    },
  });
};
