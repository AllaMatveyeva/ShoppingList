import styled from "styled-components";

export const ButtonStyle = styled.button`
padding: ${props => props.min ? "10px 40px" : "20px 70px"};
border: none;
background-color: #610c1a;
border-radius: 50px;
color: #fcfcfc;
font-family: 'Roboto';
font-size: 20px;
&:hover {
opacity: 0.5;
}
` 
export const Button = ({onClick, buttonText, min}) => {
    console.log(onClick)
    return(
<ButtonStyle onClick={onClick} min = {min}>
            <span>{buttonText}</span>
        </ButtonStyle>
    )

}