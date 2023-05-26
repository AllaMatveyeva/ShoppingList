import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    order:2;
`;

export const Substrate = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const WrapperModal = styled.div`
  margin-bottom: 10px;
  position: ${props=> props.edit ? "relative" : "absolute"};
  display: flex;
  justify-content: center;
  align-items: center;
 `;

export const ModalWindow = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
z-index: 2;
border-radius: 20px;
padding: 10px;
background-color: aliceblue;
`;

export const ButtonStyle = styled.button`
  padding: ${(props) => (props.min ? "10px 40px" : "20px 70px")};
  border: none;
  background-color: #610c1a;
  border-radius: 50px;
  color: #fcfcfc;
  font-family: "Roboto";
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const CloseIconMui = styled(CloseIcon)`
  font-size: 20px !important;
  color: #610c1a !important;
  display: ${(props) => props.edit && "none !important"};
  font-weight: bold;
  align-self: center;
  @media (max-width: 400px) {
    width: 0.7em !important;
  }
`;



export const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0;
`;

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
  @media (max-width: 415px) {
  overflow-y: auto;
  max-height: 500px;
  }
 
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
margin-right: 10px;
`;
export const Input = styled.input`
margin-bottom: 10px;
margin-right: 10px;
width: ${props => props.size ? props.size : props.accept ? "1px":""};
height: ${props=> props.accept && "1px"};
border: ${props=> props.accept ? "none" : "2px solid #dadada"};
border-radius: 7px;
    &&:focus{
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
    }
    
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


export const TrashImg = styled.img`
position: absolute;
top:50%;
left: 50%;
transform: translate(-50%, -50%);
width: ${props => props.isMobile ? "50px" : "200px"};
height: ${props => props.isMobile ? "50px" : "200px"};
`;

export const TrashContainer = styled.div`
visibility: ${(props=> props.deleteArea)};
position:relative;
border: 1px solid white;
width: 300px;
height: 100%;
order:1
`

export const MuiMenuItem = styled (MenuItem)`
display: flex;
flex-wrap: wrap;
min-width:200px;
`

export const ItemValue = styled(ButtonStyle)`
margin-right: 10px;
padding: 7px 7px;
background-color: #d2d8e9;
color: black;
margin-bottom: 5px;
min-width: 100px; 
text-align: center;
object-fit: contain;
 max-height: 30px;
&&:last-child{
  margin-right: 0;
}
`

export const ButtonCategory = styled(ButtonStyle)`
width: 200px;
text-align: center;
opacity: 0.7;
margin-bottom: 15px !important;
margin-right: 0px;
&&:last-child{
  margin-bottom: 0;
}
@media (max-width: 400px) {
  width: 150px;
  }
`;

export const MuiMenu = styled(Menu)`
.MuiMenu-root{
  border-radius: 50px !important;
  height: ${(props) => `${props.listHeight} !important`};
}
.MuiMenu-paper {
border-radius: 50px;
};
.MuiMenu-list {
  display: flex;
    flex-direction: column;
    background-color: aliceblue;
     padding: 15px 20px;
     width: 95%;
}
`;