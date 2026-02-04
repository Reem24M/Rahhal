import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button";
import OtpInput from "./OtpInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema, type TVerifyType } from "../validation/verifySchema";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

function VerifyEmailForm() {
  const { isPending, verifyEmail } = useVerifyEmail();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TVerifyType>({
    resolver: zodResolver(verifySchema),
  });

  function onSubmit(payload: TVerifyType) {
    const type = searchParams.get("type");
    const email = searchParams.get("email");
    verifyEmail(payload, {
      onSuccess: (data) => {
        toast.success(data?.data?.message);
        navigate({
          pathname: type == "sign-up" ? "/login" : "/reset-password",
          search: `?email=${email}`,
        });
      },
      onError: (error) => toast.error(error?.message),
      onSettled: () => reset(),
    });
  }

  const isWaiting = isSubmitting || isPending;
  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Verify your email
        </h1>
        <p className="text-center text-sm text-gray-600">
          Enter the 6-digit code we sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <OtpInput
          length={6}
          onComplete={(otp) => setValue("otp", otp, { shouldValidate: true })}
        />

        {errors.otp && (
          <p className="text-sm text-red-600 text-center">
            {errors.otp.message}
          </p>
        )}

        <Button disabled={isWaiting} loading={isWaiting}>
          Verify email
        </Button>

        <p className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            type="button"
            className="font-medium text-primary-700 hover:underline cursor-pointer"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}

export default VerifyEmailForm;
