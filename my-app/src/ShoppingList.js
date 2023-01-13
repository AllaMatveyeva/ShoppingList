import {  useState, useEffect } from "react";
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
const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

export const ShoppingList = (props) => {

    const [open, setOpen] = useState(false);
    const [shop, setShop] = useState(shoppingList)
    
const handleOpen = () => setOpen (true);


const handleClose = () => setOpen (false);

 useEffect (() => {
    const isEveryEmpty = shop?.every(item => item.goods.length===0);
    isEveryEmpty && localStorage.clear("shoppingList");
},[shop]);

const handleDeleteItem = (list,item) => {
    const updateShop = new Array (...shop);
    const categorySelect = updateShop.filter((shop) => shop.category === list.category);
const goodSelect = categorySelect[0].goods.filter(good => good.id !== item);
const result = updateShop.map((shop) => (shop.category === list.category) ? new Object({'category': shop.category,"goods": goodSelect}) : shop);
setShop(result);
localStorage.setItem("shoppingList",JSON.stringify(result));

}

return (
    <>
    {!open ?
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <div>
        {shop && shop.map((list)=>
        
        <BasicMenu list={list} key = {list.day} handleDeleteItem = {handleDeleteItem}/>
        
        )}
        </div>
        
        <Button onClick={handleOpen} buttonText = {addItemButtonText}>
        </Button>
        
        </div>
:
        <Modal 
         close = {handleClose}
         >
            <Addition close = {handleClose}/>
        </Modal>
}
        </>

)
}