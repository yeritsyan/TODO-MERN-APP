import { useEffect, useState } from "react";

type InputProps = {
  type: "text" | "email" | "number" | "password";
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  styleClass?: string;
  variant?: "primary" | "danger" | "success" | "dark";
  id?: string;
  autoComplete?: "email" | "current-password" | "new-password" | "off";
  onChange?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Input = ({
  type = "text",
  name = "",
  value: propInputVal = "",
  defaultValue = "",
  placeholder = "",
  styleClass = "",
  variant: _variant = "primary",
  id = "",
  autoComplete = "off",
  onChange,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(propInputVal);

  useEffect(() => {
    setInputValue(propInputVal);
  }, [propInputVal]);

  const onInputChangeHandler = (e: any) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <input
      id={id}
      name={name}
      autoComplete={autoComplete}
      value={inputValue || (defaultValue && defaultValue)}
      type={type}
      className={classNames("input", styleClass)}
      placeholder={placeholder}
      onChange={onInputChangeHandler}
    />
  );
};

export default Input;
