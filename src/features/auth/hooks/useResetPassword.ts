import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../services/apiAuth";

export function useResetPassword() {
  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
  });
  return { isPending, resetPassword };
}
