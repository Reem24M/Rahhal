import { Link, useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";
import PasswordInput from "../../../shared/components/PasswordInput";
import {
  resetPasswordSchema,
  type TResetInputsType,
} from "../validation/resetPasswordSchema";
import { useResetPassword } from "../hooks/useResetPassword";

function ResetPasswordForm() {
  const { isPending, resetPassword } = useResetPassword();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TResetInputsType>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    shouldFocusError: true,
  });
  function onSubmit(data: TResetInputsType) {
    const payload = {
      ...data,
      email: searchParams.get("email") || "",
    };
    resetPassword(payload, {
      onSuccess: (data) => {
        toast.success(data?.data?.message);
        navigate({
          pathname: "/login",
          search: "",
        });
      },
      onError: (error) => toast.error(error?.message),
      // onSettled: () => reset(),
    });
  }
  const isWaiting: boolean = isSubmitting || isPending;
  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Create a new password
        </h1>

        <p className="text-center text-sm text-gray-600">
          Your new password must be different from previously used passwords.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <PasswordInput
          label="New password"
          id="new-password"
          placeholder="Enter new password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <PasswordInput
          label="Confirm password"
          id="confirm-password"
          placeholder="Confirm new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button disabled={isWaiting} loading={isWaiting}>
          Reset password
        </Button>

        <p className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-700 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
