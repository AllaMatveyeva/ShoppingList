import * as React from "react";
import Menu from "@mui/material/Menu";

import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { CloseIconAddition } from "./AdditionStyled"
import { MenuItems } from "./MenuItem";
import { DragCategory } from "./dragCategory";
import { useRef } from "react";
import { useEffect } from "react";
import { Items } from "./Items";

export const ButtonCategory = styled(ButtonStyle)`
width: 300px;
opacity: 0.7;
margin-bottom: 15px !important;
&&:last-child{
  margin-bottom: 0;
}`;



export const MuiMenu = styled(Menu)`
.MuiMenu-root{
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

export default function BasicMenu({ list, handleDeleteItem, originalIndex, moveCategory, findCategory, deleteCategory, editCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listHeight, setListHeight] = React.useState(100);

  
  const open = Boolean(anchorEl);
  
const findListHeight = (height) => setListHeight(height);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

const handleClose = () => {
    setAnchorEl(null);
    
  };
  
 return (
    list?.goods?.length > 0 &&
    
    <div>
      <DragCategory open={open} handleClick = {handleClick} list = {list} originalIndex={originalIndex} findCategory={findCategory} moveCategory={moveCategory} deleteCategory={deleteCategory}></DragCategory> 
      <MuiMenu 
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{borderRadius:"50px !important", height:`${listHeight}px !important`}}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          
        }}
        
      >
         <CloseIconAddition style={{marginBottom:"10px", alignSelf:"center"}} onClick={() => handleClose()}></CloseIconAddition>
         <Items list={list} handleDeleteItem={handleDeleteItem} editCategory={editCategory} findListHeight={findListHeight}/>
       </MuiMenu>
    
    </div>
    
    
  );
}
