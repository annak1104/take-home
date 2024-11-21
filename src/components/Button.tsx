import { FC, ReactNode } from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  icon?: ReactNode;
  variant?: "default" | "delete" | "expand" | "revert";
};

export const Button: FC<ButtonProps> = ({
                                          children,
                                          icon,
                                          variant = "default",
                                          className,
                                          ...props
                                        }) => {
  const baseStyles = "flex items-center justify-center transition-colors rounded";
  const variantStyles = {
    default: "hover:text-gray-700",
    revert: "hover:text-gray-800",
    delete: "text-red-600 hover:text-red-800",
    expand: "text-blue-600 hover:text-blue-800 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
