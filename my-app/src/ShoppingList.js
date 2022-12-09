import {  useState } from "react";
import styled from "styled-components";
import { Addition } from "./Addition";
import { Button } from "./Button";
import { addItemButtonText } from "./buttonText";
import {  Modal } from "./Modal";

export const Wrapper = styled.div`
position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
`


export const ShoppingList = (props) => {

    const [open, setOpen] = useState(false);
    

const handleOpen = () => setOpen (true);


const handleClose = () => setOpen (false);

return (
        <>
        <Wrapper>
        <Button onClick={handleOpen} buttonText = {addItemButtonText}>
        </Button>
        </Wrapper>
         <Modal 
         open = {open}
         close = {handleClose}
         >
            <Addition close = {handleClose}/>
        </Modal>
      
    </>

)
}