/** @format */

import React, { InputHTMLAttributes, useState } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelStyle?: string;
  labelFocusedStyle?: string;
  inputStyle?: string;
  inputFocusedStyle?: string; // New prop for focused style
  containerStyle?: string;
  onValueChange?: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  labelStyle = "text-gray-500",
  labelFocusedStyle = "text-[#192245] text-xs",
  inputStyle = "text-sm bg-[#F6F6F6] border-b-2 border-[#D1D5DB]",
  inputFocusedStyle = "focus:border-[#192245] focus:border-b", // Default focused style
  containerStyle = "relative mb-4",
  onValueChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const labelClasses = `${labelStyle} absolute left-2 transition-all 
    peer-placeholder-shown:text-base peer-placeholder-shown:top-2 
    peer-focus:-top-4 peer-focus:${labelFocusedStyle}`;

  const inputClasses = `w-full px-2 py-1 peer ${inputStyle} ${
    isFocused ? inputFocusedStyle : ""
  }`;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={containerStyle}>
      <label
        htmlFor={props.id}
        className={`${labelClasses} ${
          value || isFocused ? "-top-4 text-xs " : "top-2 text-sm"
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
