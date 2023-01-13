import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonStyle } from "./Button";
import { addbuttonText, saveButtonText } from "./buttonText";
import { FormBody } from "./FormBody";
import { CloseIconMui } from "./Modal";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  font-family: roboto;
font-size: 17px;
`;
export const Submit = styled(ButtonStyle)``;


export const GoodImg = styled.img`
object-fit: cover;
display: block;
margin-top: -10px;
`
export const ButtonBlock  = styled.div`
display: flex;
justify-content: space-between;
 margin-top: 15px;
`

export const Label = styled.label`
width: 105px;
display: inline-block;
`;
export const Input = styled.input`
margin-left: 20px;
width: ${props => props.size && props.size};
border: 2px solid #dadada;
    border-radius: 7px;
    &&:focus{
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
    }
    
`;

export const InputFile = styled.input`

  height: 1px;
  width: 1px;
  
  margin-left: 20px;
`;

export const Textarea = styled.textarea`
margin-left: 20px;
resize: none;
`
export const CloseIconAddition = styled(CloseIconMui)`
align-self: flex-start;
`;
export const Wrapper = styled.div`
margin-right: 15px;`

export const Addition = ({ close }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [fileDataURL, setFileDataURL] = useState(new Map());
  const [itemNumber, setItemNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [goodsValue, setGoodsValue] = useState(new Map());
  const [itemsAddition, setItemsAddition] = useState(new Set([1]));

  useEffect (() => {
    let fileReader, isCancel = false;
    fileReader = new FileReader();
   
    if (file) {
      fileReader.onload = (e)=> {
        const {result} = e.target;
        console.log(e.target)
        if (result && !isCancel) {
          const updatedValue = new Map(fileDataURL);
          updatedValue.set(itemNumber,result)
          
          setFileDataURL(new Map (updatedValue));
          
          const updateValue = new Map (goodsValue);
    updateValue.set(itemNumber,
         {
         name: updateValue.get(itemNumber)?.name,
          number: updateValue.get(itemNumber)?.number,
          image: result,
          id: updateValue.get(itemNumber)?.id
           }
       )
    
    setGoodsValue(new Map(updateValue));

        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  },[file])
  
  const handleCategoryChange = (event) => {
    setCategoryValue( event.target.value)
  };

  const handleChange = (event,id) => {
    
if (event.target.id ==="image") {
  const file = event.target.files[0];
 setFile(file);
}

const name = event.target.id === "name" ?  event.target.value :  (goodsValue?.get(id)?.name || "");
const number = event.target.id === "number" ?  event.target.value :  (goodsValue?.get(id)?.number || "");
const image = event.target.id === "image" ?  event.target.files[0] :  (goodsValue?.get(id)?.image || "");

    const updateValue = new Map (goodsValue);
    updateValue.set(id,
         {
         name: name,
         number: number,
         id:id
         }
       )
    
    setGoodsValue(new Map(updateValue));
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    const shoppingList = [{
      category: categoryValue,
      goods: Array.from(goodsValue.values()),
      day: new Date(),
    }];

    const oldShoppingList = (JSON.parse (localStorage.getItem("shoppingList")));
    oldShoppingList?.forEach((list) => {
    if ( list.category===shoppingList[0].category ) {
      shoppingList[0].goods=(shoppingList[0].goods).concat(list.goods);
    } })
    const updateShoppingList = oldShoppingList?.filter(list=>list.category!==shoppingList[0].category);
   const newShoppingList = oldShoppingList ? shoppingList.concat(updateShoppingList) : shoppingList;
   console.log(updateShoppingList)
    localStorage.setItem("shoppingList", JSON.stringify(newShoppingList));
  };

  const handleAdd = () => {
    const num = Array.from(itemsAddition).reduce( (accumulator, currentValue) => accumulator + currentValue);
    const newValueSet = itemsAddition.size > 0 ? itemsAddition.size + num : 1;
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.add (newValueSet);
    setItemsAddition(new Set (updatedItemsAddition));
  };

  const handleRemove = (item) => {
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.delete (item);
    setItemsAddition(new Set (updatedItemsAddition));
    const updateValue = new Map (goodsValue);
    updateValue.delete(item);
    setGoodsValue(() => new Map (updateValue));
  }
  
  return (
    <Form onSubmit={handleSubmit}>
     
        <div style={{display: "flex", margin: "15px"}}>
         <Wrapper> 
          <div>
          <Label htmlFor="category">Enter category:</Label>
          <Input type="text" value={categoryValue} placeholder="category" id="category" required onChange={(event)=>handleCategoryChange(event)}/>
          </div>
          {Array.from(itemsAddition).map((item) => {
console.log(item);
          return (
          <div  key={item} 
          style={{display: "flex", justifyContent: "center", marginTop: "10px", alignItems: "flex-end", flexWrap:"wrap"}}>
          <Label htmlFor="name">Enter goods:</Label>
          <Input type="text" value={goodsValue.name} id="name" placeholder="name" required onChange={(event) => handleChange(event,item)}/>
          <Input type="number"  id="number" value={goodsValue.number} size="65px" min="1" placeholder="number"  onChange={(event) => handleChange(event,item)}/>
          <InputFile type="file" id="image" accept="image/*" placeholder="image"  value = {goodsValue.image}  onChange={(event) => handleChange(event,item)}>
            </InputFile>
          <Label htmlFor="image" onClick={(e)=>setItemNumber(item)}>
            {fileDataURL.has(item) ? 
             <GoodImg src={fileDataURL.get(item)} alt="Good image"  width="50" height="50"/> : "Load good image"} </Label>
         {itemsAddition.size > 1 &&
        <CloseIconAddition onClick= {() => handleRemove (item)}/>
}
          </div>
)})}
        </Wrapper>
        </div>
      <ButtonBlock>
        <Button onClick={handleAdd} buttonText={addbuttonText} min />
        <Submit as="input" type="submit" value={saveButtonText} min />
      </ButtonBlock>
    </Form>
  );
};
