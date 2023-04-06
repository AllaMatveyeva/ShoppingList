import styled from "styled-components"
import MenuItem from "@mui/material/MenuItem";
import { CloseIconAddition } from "./AdditionStyled"
import { ButtonStyle } from "./Button";
import { Modal } from "./Modal";
import { useState } from "react";
import { Editing } from "./Editing";
import { useFileReader } from "./useFileReader";
import { useEffect } from "react";

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

export const MenuItems = ({good,list, handleDeleteItem, editCategory}) => {
const [openEditWindow,setOpenEditWindow] = useState(false);
const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState();
    const getFile = (file) => setFile(file);
    const url = useFileReader(file);
    
    const getFileDataUrl = (url) => {
         setFileDataURL(url);
      };
    
const [goodValue, setGoodValue] = useState({
  name: good.name,
  number:good.number,
  image: good.image
})




const handleChange = (e,id) => {
const target = e.target;
const name = target.id;

if (name ==="image") {
  const file = e.target.files[0];
   setFile(file);
   console.log(file)
}

console.log(`fileDataURL: ${fileDataURL}`);
console.log(`goodValue.image: ${goodValue.image}`);
setGoodValue({...goodValue,
 [name]:name ==="image" ? fileDataURL || goodValue.image : target.value
}
)
}

const update = (list.goods).map((goodLi)=>{
console.log(goodLi);
console.log(good)
if (goodLi.id !== good.id) {return goodLi} else {
return ({
id: goodLi.id,
image: goodValue.image,
key: goodLi.key,
name: goodValue.name,
number: goodValue.number,
})}});


const newGood = {
...list,
goods: update
};

const categoryId = list.categoryId;

const handleClose = (e,edit) => {
  console.log(categoryId, newGood)
 if (edit) editCategory(categoryId,newGood);
  setOpenEditWindow(false)

} 

return (
  <div style={{display:"flex", width: "100%",justifyContent: "space-between"}}>
  {openEditWindow ? (
    <Modal>
      <Editing good={good} id = {categoryId} file = {file} getFile={getFile} getFileDataUrl={getFileDataUrl} editCategory={editCategory} fileDataURLEdit={fileDataURL} list={list} handleClose={handleClose} handleChange={handleChange} goodValue={goodValue}></Editing>
    </Modal>
  ) :
  <>
 <MuiMenuItem onClick={() => setOpenEditWindow(true)}>
            <ItemValue as="div">{good.name}</ItemValue>
            {good.number && <ItemValue>amount: {good.number}</ItemValue>}
            {good.image && <ItemValue as="img" src={good.image} alt="good" width="50" height="50" style={{objectFit:"contain", maxHeight:"30px"}}></ItemValue>}
            
          </MuiMenuItem>
          <CloseIconAddition style={{marginLeft:"-15px"}} onClick={() => handleDeleteItem(list, good.id)}></CloseIconAddition>
          </>
  }
 
          </div>
  
)

}