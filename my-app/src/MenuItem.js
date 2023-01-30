import styled from "styled-components"
import MenuItem from "@mui/material/MenuItem";
import { CloseIconAddition } from "./AdditionStyled"
import { ButtonStyle } from "./Button";

export const MuiMenuItem = styled (MenuItem)`
display: flex;
flex-wrap: wrap;
 min-width:200px;
`;

export const ItemValue = styled(ButtonStyle)`
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

export const MenuItems = ({good,list, handleDeleteItem}) => {
return (
  <div style={{display:"flex", width: "100%",justifyContent: "space-between"}}>
  
    <MuiMenuItem>
            <ItemValue as="div">{good.name}</ItemValue>
            {good.number && <ItemValue>amount: {good.number}</ItemValue>}
            {good.image && <ItemValue as="img" src={good.image} alt="good" width="50" height="50" style={{objectFit:"contain", maxHeight:"30px"}}></ItemValue>}
            
          </MuiMenuItem>
          <CloseIconAddition style={{marginLeft:"-15px"}} onClick={() => handleDeleteItem(list, good.id)}></CloseIconAddition>
          </div>
)

}