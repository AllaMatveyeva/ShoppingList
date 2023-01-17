import styled from "styled-components"
import { Button } from "./Button";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export const Substrate = styled.div`
  position: absolute;
 width: 100%;
 height: 100%;
 z-index: -100;
    top: 0;
    left: 0;
 `;

export const Wrapper = styled.div`
margin-top: 50px;
    margin-bottom: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
 `

export const ModalWindow = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;

border-radius: 20px;
padding: 10px;
background-color: aliceblue;
`;

export const WrapperButton = styled.div`
justify-content: flex-end;
  display: flex;
`;

export const CloseIconMui = styled(CloseIcon)`
   font-size: 20px !important;
   color:  #610c1a !important;
    font-weight: bold;
    align-self: flex-end;
`



export const Modal = ({children, close,}) => {
  
    return (
         <>
        <Substrate onClick={close}>
        </Substrate>
        <Wrapper>
        <ModalWindow>
        <CloseIconMui onClick={close}/>
        {children}
        <WrapperButton>
        {/* <Button onClick={close} buttonText = {buttonText} min/> */}
        </WrapperButton>
    </ModalWindow>
    </Wrapper>
    </>
    )
}