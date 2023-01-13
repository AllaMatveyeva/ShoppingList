import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { CloseIconAddition } from "./FormBody";


const ItemValue = styled(ButtonStyle)`
margin-right: 15px;
padding: 10px 10px;
background-color: #d2d8e9;
color: black;
margin-bottom: 5px;
min-width: 100px; 
text-align: center;
&&:last-child{
  margin-right: 0;
}
`;
// min-width: 100px; text-align: center; ${props=>props.width && props.width};
export const ButtonCategory = styled(ButtonStyle)`
width: 300px;
opacity: 0.7;
margin-bottom: 15px !important;
&&:last-child{
  margin-bottom: 0;
}

`;
const MuiMenu = styled(Menu)`
.MuiMenu-root{
  
}
.MuiMenu-paper{
border-radius: 50px;
};
.MuiMenu-list{
  display: flex;
    flex-direction: column;
     padding: 15px 20px;
}
`


export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 
  return (
    props.list.goods.length > 0 &&
    <div>
      <ButtonCategory
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        width={`${props.list.goods.length*50}%`}
      >
        {`${props.list.category} (${props.list.goods.length})`}
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
        {props.list.goods?.map((good) => {
          return (
          <MenuItem  style={{ display: "flex", flexWrap:"wrap", minWidth:"200px"}}>
            <ItemValue as="div">{good.name}</ItemValue>
            {good.number && <ItemValue>amount: {good.number}</ItemValue>}
            {good.image && <ItemValue as="img" src={good.image} alt="good" width="50" height="50" style={{objectFit:"contain", maxHeight:"30px"}}></ItemValue>}
            <CloseIconAddition style={{marginLeft:"-15px"}} onClick={() => props.handleDeleteItem(props.list, good.id)}></CloseIconAddition>
          </MenuItem>
        )})}
        
      </MuiMenu>
    
    </div>
    
  );
}
