import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../services/apiAuth";

export function useVerifyEmail() {
  const { isPending, mutate: verifyEmail } = useMutation({
    mutationFn: verifyEmailApi,
  });

  return { isPending, verifyEmail };
}
