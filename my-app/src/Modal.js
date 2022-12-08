import styled from "styled-components"
import { Button } from "./Button";


export const Wrapper = styled.div`
  position: absolute;
 width: 100%;
 height: 100%;
  background-color: #c7c7c3;
  border: 2px solid #000;
  box-shadow: 24;
  `;

export const ModalWindow = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%);
min-width: 400px;
min-height: 200px;
border-radius: 20px;
padding: 10px;
background-color: aliceblue;
`;
export const WrapperButton = styled.div`
justify-content: flex-end;
  display: flex;
`;

const buttonText = "save";

export const Modal = ({open, children, close,}) => {

    console.log(close)

    return (
        open &&
        <>
        <Wrapper onClick={close}>
        </Wrapper>
        <ModalWindow >
        {children}
        <WrapperButton>
        <Button onClick={close} buttonText = {buttonText} min/>
        </WrapperButton>
    </ModalWindow>
    </>
    )
}