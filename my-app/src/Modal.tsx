import React from "react";
import { ModalWindow, Substrate, WrapperModal, CloseIconMui } from "./AdditionStyled";

export const Modal = ({ children, close, edit }) => {
  return (
    <>
      <Substrate onClick={close}/>
      <WrapperModal edit={edit}>
        <ModalWindow>
          <CloseIconMui edit={edit} onClick={close}/>
          {children}
         </ModalWindow>
      </WrapperModal>
    </>
  );
};
