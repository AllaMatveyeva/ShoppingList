import { ButtonStyle } from "./AdditionStyled";


export const Button = ({ onClick, buttonText, min }) => {
  return (
    <ButtonStyle onClick={onClick} min={min}>
      <span>{buttonText}</span>
    </ButtonStyle>
  );
};
