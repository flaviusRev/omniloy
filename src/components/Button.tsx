/** @format */

import React from "react";

interface IconProps {
  name: string;
  position: "left" | "right";
}

const Icon: React.FC<IconProps> = ({ name, position }) => {
  // Implement icon rendering logic based on the icon's name and position
  return <span>{/* Icon rendering logic goes here */}</span>;
};

interface ButtonProps {
  borderColor?: string;
  borderWidth?: string;
  text: string;
  leftIcon?: string;
  rightIcon?: string;
  background?: string;
  size?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  rounded?: string;
  fontWeight?: string;
  [x: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  borderColor = "border-gray-300",
  borderWidth = "border-2",
  text,
  leftIcon,
  rightIcon,
  background = "bg-white",
  size = "text-base",
  textColor = "text-black",
  padding = "p-2",
  margin = "",
  rounded = "",
  fontWeight = "font-normal",
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center ${borderColor} ${borderWidth} ${background} ${size} ${padding} ${margin} ${textColor} ${rounded} ${fontWeight}`}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon} position="left" />}
      <span className="mx-2">{text}</span>
      {rightIcon && <Icon name={rightIcon} position="right" />}
    </button>
  );
};

export default Button;
