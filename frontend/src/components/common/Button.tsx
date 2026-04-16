type ButtonProps = {
  text: string;
  styleClass?: string;
  disabled?: boolean;
  variant?: "primary" | "danger" | "success" | "dark";
  onClick?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({
  text = "",
  styleClass = "",
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={classNames(
        "btn",
        variant === "primary"
          ? "btn-primary"
          : variant === "danger"
            ? "btn-danger"
            : variant === "success"
              ? "btn-success"
              : "btn-dark",
        styleClass,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
