import styled from "styled-components"
import MenuItem from "@mui/material/MenuItem";
import { CloseIconAddition } from "./AdditionStyled"
import { ButtonStyle } from "./Button";
import { Modal } from "./Modal";
import { useRef, useState } from "react";
import { Editing } from "./Editing";
import { useFileReader } from "./useFileReader";
import { useEffect } from "react";
import { trash } from "./dragCategory";

export const MuiMenuItem = styled (MenuItem)`
display: flex;
flex-wrap: wrap;
 min-width:200px;
`;

export const ItemValue = styled(ButtonStyle)`
margin-right: 5px;
padding: 7px 7px;
background-color: #d2d8e9;
color: black;
margin-bottom: 5px;
min-width: 100px; 
text-align: center;
&&:last-child{
  margin-right: 0;
}
`;

export const MenuItems = ({good,list, handleDeleteItem, editCategory}) => {
const [openEditWindow,setOpenEditWindow] = useState(false);
const categoryId = list.categoryId;
const closeWindow = () => setOpenEditWindow(false);
const myRef = useRef();


return (
  <div style={{display:"flex", width: "100%",justifyContent: "space-between"}} >
  {openEditWindow ? (
    <Modal edit="true" close={()=> setOpenEditWindow(false)}>
      <hr style={{width:"105%"}}/>
      <Editing currentGood={good} id = {categoryId} editCategory={editCategory}  list={list} categoryId={categoryId} closeWindow={closeWindow}></Editing>
    </Modal>
  ) :
  <>
 <MuiMenuItem onClick={() => setOpenEditWindow(true)}>
            <ItemValue as="div">{good.name}</ItemValue>
            {good.number && <ItemValue>amount: {good.number}</ItemValue>}
            {good.image && <ItemValue as="img" src={good.image} alt="good" width="50" height="50" style={{objectFit:"contain", maxHeight:"30px"}}></ItemValue>}
            
          </MuiMenuItem>
          {/* /<CloseIconAddition style={{marginLeft:"-15px"}} onClick={() => handleDeleteItem(list, good.id)}></CloseIconAddition> */}
          <img src={trash} width="20px" height="20px" alt="trash" style={{marginRight:"25px"}} onClick={() => handleDeleteItem(list, good.id)}></img>
          </>
  }
 
          </div>
  
)

}