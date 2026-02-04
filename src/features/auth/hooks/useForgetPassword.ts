import { useMutation } from "@tanstack/react-query";
import { forgetPassword as forgetPasswordApi } from "../services/apiAuth";

export function useForgetPassword() {
  const { isPending, mutate: forgetPassword } = useMutation({
    mutationFn: forgetPasswordApi,
  });
  return { isPending, forgetPassword };
}
