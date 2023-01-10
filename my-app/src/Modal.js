import styled from "styled-components"
import { Button } from "./Button";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

// export const Substrate = styled.div`
//   position: absolute;
//  width: 100%;
//  height: 100%;
//   background-color: #c7c7c3;
//   border: 2px solid #000;
//   box-shadow: 24;
//   `;

export const Wrapper = styled.div`
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



export const Modal = ({open, children, close,}) => {
  
    return (
        open &&
        <>
        {/* <Substrate onClick={close}>
        </Substrate> */}
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