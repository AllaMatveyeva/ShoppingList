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
    background-color: aliceblue;
     padding: 15px 20px;
     max-height: 350px;
     ::-webkit-scrollbar {
background-color: #d2d8e9;
width: 10px;
};
::-webkit-scrollbar-thumb { 
  background-color: #b3c4d2;
};
   
overflow-y: auto;

}
`;

export default function BasicMenu({ list, handleDeleteItem, originalIndex, moveCategory, findCategory, deleteCategory, editCategory }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuPozitionY = anchorEl?.getBoundingClientRect().y

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
console.log(anchorEl?.getBoundingClientRect().y);

 return (
    list?.goods?.length > 0 &&
    
    <div>
      <DragCategory open={open}  handleClick = {handleClick} list = {list} originalIndex={originalIndex} findCategory={findCategory} moveCategory={moveCategory} deleteCategory={deleteCategory}></DragCategory> 
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{borderRadius:"50px !important"}}
        anchorOrigin={{
          vertical: menuPozitionY > 350 ? 'top' : "bottom",
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: menuPozitionY > 350 ? 'bottom' : "top",
          horizontal: 'center',
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
         <CloseIconAddition style={{alignSelf:"center"}} closeMenu="true" onClick={() => handleClose()}></CloseIconAddition>
        {list.goods?.map((good,index) => {
          return (
            <div key={good.id}>
         <MenuItems  good={good} list={list} handleDeleteItem={handleDeleteItem} editCategory={editCategory}/>
         <hr/>
         </div>
        )})}
        
      </MuiMenu>
    
    </div>
    
    
  );
}
