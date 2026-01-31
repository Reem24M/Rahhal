interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
}) => {
  const base =
    "!rounded-full px-5 cursor-pointer py-2 text-xs font-medium transition";

  const styles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "bg-[#28AEBD] text-white hover:bg-gray-800";

  return <button className={`${base} ${styles}`}>{children}</button>;
};

export default Button;
