import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./Button";
import { addbuttonText, saveButtonText } from "./buttonText";
import { FormBody } from "./FormBody";
import { getNewMapValue } from "./utils/getNewMapValue";
import { Form, Submit, ButtonBlock, Label, Input, Wrapper } from "./AdditionStyled";
import { getJsonValue } from "./utils/getJsonValue";
import { useDispatch, useSelector } from "react-redux";
import { category, good } from "./redux/selectors";
import { changeCategory, changeGood } from "./redux/actions";


export const Addition = () => {
  
  const [itemNumber, setItemNumber] = useState(1);
  const [file, setFile] = useState(null);
 const [itemsAddition, setItemsAddition] = useState(new Set([1]));
  const dispatch = useDispatch();
const categoryValue = useSelector (category);
const goodsValue = useSelector(good);

const categoryList = ["home", "beauty", "drinkables", "groats", "bread", "stationery", ]


  const handleCategoryChange = (event) => {
   dispatch(changeCategory( event.target.value));
   };

   const handleSubmit = (event) => {
    //event.preventDefault();
   const shoppingList = [{
      category: categoryValue,
      categoryId: categoryValue + Date(),
      goods: Array.from(goodsValue.values()),
      day: new Date(),
    }];

    const oldShoppingList = getJsonValue("shoppingList");
    oldShoppingList?.forEach((list) => {
    if ( list.category===shoppingList[0].category ) {
      shoppingList[0].goods=(shoppingList[0].goods).concat(list.goods);
    } })
    const updateShoppingList = oldShoppingList?.filter(list=>list.category!==shoppingList[0].category);
   const newShoppingList = oldShoppingList ? shoppingList.concat(updateShoppingList) : shoppingList;
   console.log(categoryValue)
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
    const newGoodsValue = goodsValue;
    const updatedGoodsValue = newGoodsValue.filter(goodValue=>goodValue.key!==item);
    dispatch(changeGood(updatedGoodsValue));
    setFile(null)
  }
  
  const getItemNumber =(item) => {
    setItemNumber(item);
  }
const getFile = (file) => setFile(file);

  return (
    <Form autocomplete="off" onSubmit={handleSubmit}>
     <div style={{display: "flex", margin: "15px"}}>
         <Wrapper> 
          <div>
          <Label htmlFor="category">Enter category:</Label>
          <Input type="text" value={categoryValue} placeholder="category" id="category" required onChange={(event)=>handleCategoryChange(event)}/>
          </div>
          {Array.from(itemsAddition).map((item,index) => {
            return (
            <FormBody item={item} id={item} key = {index} getFile={getFile} itemsAddition={itemsAddition} itemNumber={itemNumber} file={file} getItemNumber={getItemNumber} handleRemove={handleRemove}/>
          
)})}
        </Wrapper>
        </div>
      <ButtonBlock>
        <Button onClick={handleAdd} buttonText={addbuttonText} min="min" />
        <Submit as="input" type="submit" value={saveButtonText} min="min" />
      </ButtonBlock>
    </Form>
  );
};
