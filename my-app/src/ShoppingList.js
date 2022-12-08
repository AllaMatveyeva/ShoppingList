import { useState } from "react";
import styled from "styled-components";
import { Addition } from "./Addition";
import { Button } from "./Button";
import {  Modal } from "./Modal";

export const Wrapper = styled.div`
position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
`
const buttonText = "Add item"

export const ShoppingList = (props) => {

    const [open, setOpen] = useState(false);

const handleOpen = () => setOpen (true);


const handleClose = () => setOpen (false);


    return (
        <>
        <Wrapper>
        <Button onClick={handleOpen} buttonText = {buttonText}>
        </Button>
        </Wrapper>
         <Modal 
         open = {open}
         close = {handleClose}
         >
            <Addition/>
        </Modal>
      
    </>

)
}