import * as React from "react";
import Menu from "@mui/material/Menu";

import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { CloseIconAddition } from "./AdditionStyled"
import { MenuItems } from "./MenuItem";
import { DragCategory } from "./dragCategory";

export const ButtonCategory = styled(ButtonStyle)`
width: 300px;
opacity: 0.7;
margin-bottom: 15px !important;
&&:last-child{
  margin-bottom: 0;
}`;

export const MuiMenu = styled(Menu)`
.MuiMenu-root{};
.MuiMenu-paper{
border-radius: 50px;
};
.MuiMenu-list{
  display: flex;
    flex-direction: column;
     padding: 15px 20px;
}
`;

export default function BasicMenu({ list, handleDeleteItem, originalIndex, moveCategory, findCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

 return (
    list?.goods?.length > 0 &&
    
    <div>
      <DragCategory open={open} handleClick = {handleClick} list = {list} originalIndex={originalIndex} findCategory={findCategory} moveCategory={moveCategory}></DragCategory> 
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{borderRadius:"50px !important"}}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
         <CloseIconAddition style={{alignSelf:"flex-end"}} onClick={() => handleClose()}></CloseIconAddition>
        {list.goods?.map((good,index) => {
          return (
         <MenuItems key={good.id} good={good} list={list} handleDeleteItem={handleDeleteItem}/>
        )})}
        
      </MuiMenu>
    
    </div>
    
    
  );
}
