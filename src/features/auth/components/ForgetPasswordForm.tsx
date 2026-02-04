import { Link, useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { useForm } from "react-hook-form";
import {
  forgetPasswordSchema,
  type TForgetPasswordType,
} from "../validation/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPassword } from "../hooks/useForgetPassword";
import toast from "react-hot-toast";

function ForgotPassword() {
  const { isPending, forgetPassword } = useForgetPassword();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TForgetPasswordType>({
    mode: "onBlur",
    resolver: zodResolver(forgetPasswordSchema),
  });
  function onSubmit(payload: TForgetPasswordType) {
    forgetPassword(payload, {
      onSuccess: () => {
        navigate({
          pathname: "/verify-email",
          search: "?type=forget-password",
        });
        toast.success("please confirm your email");
      },
      onError: (error) => toast.error(error?.message),
      onSettled: () => reset(),
    });
  }
  const isWaiting = isSubmitting || isPending;
  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-7">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Forgot your password?
        </h1>
        <p className="text-center text-sm text-gray-600">
          Enter your email and we’ll send you a verification code.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button disabled={isWaiting} loading={isWaiting}>
          Send code
        </Button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
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

export default ForgotPassword;
