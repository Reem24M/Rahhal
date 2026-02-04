import { Link, useNavigate } from "react-router";
import Button from "../../../shared/components/Button.tsx";
import Input from "../../../shared/components/Input";
import PasswordInput from "../../../shared/components/PasswordInput";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  type TLoginInputsType,
} from "../validation/loginSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin.ts";
import toast from "react-hot-toast";

function LoginForm() {
  const { isPending, login } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginInputsType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    shouldFocusError: true,
  });

  function onSubmit(payload: TLoginInputsType) {
    login(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "welcome in your rahhal account");
        navigate("/feed");
      },
      onError: (error) => toast.error(error?.message),
      onSettled: () => reset(),
    });
  }
  const isWaiting: boolean = isSubmitting || isPending;
  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-6">
      <h1 className="text-center text-2xl font-semibold text-gray-800">
        Login to your profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email or Username"
          id="username"
          placeholder="username or email"
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          id="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Link
          to="/forget-password"
          className="self-end text-sm font-medium text-primary-600 hover:underline"
        >
          Forgot password?
        </Link>

        <Button disabled={isWaiting} loading={isWaiting}>
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <Link
            to="/sign-up"
            className="font-medium text-primary-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
