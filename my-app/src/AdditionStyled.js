import styled from "styled-components";
import { CloseIconMui } from "./Modal";
import { ButtonStyle } from "./Button";



export const WrapperFormBody = styled.div`
display: flex;
 justify-content: center;
  margin-top: 10px;
 align-items: flex-end;
  flex-wrap: wrap;
  
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  font-family: roboto;
font-size: 17px;
`;
export const Submit = styled(ButtonStyle)``;


export const GoodImg = styled.img`
object-fit: cover;
display: block;
margin-top: -10px;
`
export const ButtonBlock  = styled.div`
display: flex;
justify-content: space-between;
 margin-top: 15px;
`

export const Label = styled.label`
width: 105px;
display: inline-block;
color: #3c16c0;
`;
export const Input = styled.input`
margin-left: 20px;
margin-bottom: 15px;
width: ${props => props.size && props.size};
border: 2px solid #dadada;
    border-radius: 7px;
    &&:focus{
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
    }
    
`;

export const InputFile = styled.input`

  height: 1px;
  width: 1px;
    
`;

export const Textarea = styled.textarea`
margin-left: 20px;
resize: none;
`
export const CloseIconAddition = styled(CloseIconMui)`
align-self: flex-start;
`;
export const Wrapper = styled.div`
margin-right: 15px;`
