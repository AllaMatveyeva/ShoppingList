import React from "react";
import { ButtonStyle } from "./AdditionStyled";

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
  min: boolean
 }

export const Button = ({ onClick, buttonText, min }: ButtonProps) => {
  return (
    <ButtonStyle onClick={onClick} min={min}>
      <span>{buttonText}</span>
    </ButtonStyle>
  );
};
