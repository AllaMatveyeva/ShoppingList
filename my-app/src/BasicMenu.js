import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const ItemValue = styled.div`
margin-right: 15px;
&&:last-child{
  margin-right: 0;
}
`;

export const ButtonCategory = styled(ButtonStyle)`
width: 400px;
opacity: 0.7;
margin-bottom: 15px !important;
&&:last-child{
  margin-bottom: 0;
}
`

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (good) => {
    console.log(good.image)
    setAnchorEl(null);
  };

  const getImage = (image) => {
    var reader = new FileReader();
return reader.readAsDataURL(image)
  }
  console.log(props.list);

  return (
    <div>
      <ButtonCategory
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {props.list.category}
      </ButtonCategory>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.list.goods?.map((good) => (
          <MenuItem onClick={(good) => handleClose(good)} style={{ display: "flex" }}>
            <ItemValue>{good.name}</ItemValue>
            {good.number && <ItemValue>amount: {good.number}</ItemValue>}
            {good.image && <ItemValue as="img" src={good.image} alt="good" width="50" height="50"></ItemValue>}
          </MenuItem>
        ))}
      </Menu>
    
    </div>
    
  );
}
