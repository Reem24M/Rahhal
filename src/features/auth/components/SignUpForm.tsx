import { signUpSchema, type TSignUpType } from "../validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import PasswordInput from "../../../shared/components/PasswordInput";
import { useSignUp } from "../hooks/useSignUp";
import toast from "react-hot-toast";
function SignUpForm() {
  const { isPending, signUp } = useSignUp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
    shouldFocusError: true,
  });
  function onSubmit(payload: TSignUpType) {
    signUp(payload, {
      onSuccess: (data) => {
        navigate({
          pathname: "/verify-email",
          search: "?type=sign-up",
        });
        toast.success(data?.message);
      },
      onError: (error: Error) => {
        toast.error(error?.message);
      },
      onSettled: () => {
        reset();
      },
    });
  }

  const isWaiting: boolean = isSubmitting || isPending;
  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-8">
      <h1 className="text-center text-2xl font-semibold text-gray-800">
        Sign up to create your account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex justify-between  flex-col sm:flex-row">
          <Input
            label="First name"
            placeholder="John"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Last name"
            placeholder="Doe"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <Input
          label="Username"
          placeholder="Mohamed"
          {...register("username")}
          error={errors.username?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          type="text"
          inputMode="numeric"
          placeholder=".10196809082"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <div className="flex justify-between gap-4 flex-col sm:flex-row">
          <PasswordInput
            label="Password"
            placeholder="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <Button disabled={isWaiting} loading={isWaiting}>
          {isWaiting ? "Signing up..." : "Sign up"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
