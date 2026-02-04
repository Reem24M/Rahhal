import { BASE_URL, ERROR_MESSAGES } from "../../../utils/constant";
import type { TForgetPasswordType } from "../validation/forgetPasswordSchema";
import type { TLoginInputsType } from "../validation/loginSchema";
import type { TSignUpType } from "../validation/signUpSchema";
import type { TVerifyType } from "../validation/verifySchema";

export async function signUp(payload: TSignUpType) {
  const res = await fetch(`${BASE_URL}/Auth/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);

  const data = await res.json();
  if (!data.isSuccess) throw new Error(data.message || "Failed to sign up");
  return data;
}

export async function login(payload: TLoginInputsType) {
  const res = await fetch(`${BASE_URL}/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.isSuccess)
    throw new Error(data?.message || "Email or Password incorrect");
  if (!res.ok) throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);

  return data;
}
export async function verifyEmail(payload: TVerifyType) {
  const res = await fetch(`${BASE_URL}/Auth/VerifyOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.isSuccess)
    throw new Error(data?.message || "verify otp is invalid");
  if (!res.ok) throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  return data;
}
export async function forgetPassword(payload: TForgetPasswordType) {
  const res = await fetch(`${BASE_URL}/Auth/ForgetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.isSuccess) throw new Error(data?.message || "");
  if (!res.ok) throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  return data;
}

export async function resetPassword(payload: {
  email: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const res = await fetch(`${BASE_URL}/Auth/ResetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.isSuccess) throw new Error(data?.message || "");
  if (!res.ok) throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  return data;
}
