import * as React from "react";
import Menu from "@mui/material/Menu";

import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { CloseIconAddition } from "./AdditionStyled"
import { MenuItems } from "./MenuItem";

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

export default function BasicMenu({ list, handleDeleteItem }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 return (
    list.goods.length > 0 &&
    <div>
      <ButtonCategory
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        width={`${list.goods.length*50}%`}
      >
        {`${list.category} (${list.goods.length})`}
      </ButtonCategory>
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
          console.log(good.id)
          return (
         <MenuItems key={good.id} good={good} list={list} handleDeleteItem={handleDeleteItem}/>
        )})}
        
      </MuiMenu>
    
    </div>
    
  );
}
