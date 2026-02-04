import { useRef, useState } from "react";

type OtpInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
};

function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every(Boolean)) {
      onComplete?.(newOtp.join(""));
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length).split("");

    if (!pasted.every((char) => /^\d$/.test(char))) return;

    setOtp(pasted);

    pasted.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index]!.value = char;
      }
    });

    inputsRef.current[pasted.length - 1]?.focus();
    onComplete?.(pasted.join(""));
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="
            h-12 w-12 rounded-md border border-gray-300
            text-center text-lg font-semibold
            focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600
          "
        />
      ))}
    </div>
  );
}

export default OtpInput;
