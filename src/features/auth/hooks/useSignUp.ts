import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";
export function useSignUp() {
  const {
    data,
    isPending,
    mutate: signUp,
    error,
  } = useMutation({
    mutationFn: signUpApi,
  });

  return { data, isPending, signUp, error };
}
