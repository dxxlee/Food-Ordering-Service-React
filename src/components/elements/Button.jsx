import clsx from "clsx";

const sizes = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg w-full",
};

const variants = {
  secondary: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400",
  primary: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
  dark: "bg-black hover:bg-gray-800 focus:ring-gray-400",
};

const Button = ({
  children,
  className,
  size = "medium",
  variant = "primary",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "text-white font-bold rounded-3xl transition duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-opacity-50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        variants[variant],
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
