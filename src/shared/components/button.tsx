import SpinnerMini from "./SpinnerMini";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const base =
    "!rounded-md px-5 cursor-pointer py-2 text-md font-medium transition  disabled:bg-primary-700 disabled:cursor-not-allowed";

  const variations = {
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    primary: "bg-primary-600 text-gray-0 hover:bg-primary-700 duration-300",
  };

  return (
    <button
      className={`${base} ${variations[variant]} ${loading && "flex items-center justify-center gap-2"} `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <SpinnerMini />} {children}
    </button>
  );
};

export default Button;
