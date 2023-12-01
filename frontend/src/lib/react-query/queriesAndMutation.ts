import { useMutation } from "@tanstack/react-query";
import { signInAccount } from "../action/authAction";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
