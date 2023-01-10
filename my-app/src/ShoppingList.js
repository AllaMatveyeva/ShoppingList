import {  useState } from "react";
import styled from "styled-components";
import { Addition } from "./Addition";
import BasicMenu from "./BasicMenu";
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

const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop:"200px"}}>
        <div>
        {shoppingList && shoppingList.map((list,index)=>
        
        <BasicMenu list={list}/>
        
        )}
        </div>
        {!open &&
        <Button onClick={handleOpen} buttonText = {addItemButtonText}>
        </Button>
        }
        </div>
        <Modal 
         open = {open}
         close = {handleClose}
         >
            <Addition close = {handleClose}/>
        </Modal>
      
    </>

)
}