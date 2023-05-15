import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./Button";
import { addbuttonText, saveButtonText } from "./buttonText";
import { FormBody } from "./FormBody";
import { getNewMapValue } from "./utils/getNewMapValue";
import { Form, Submit, ButtonBlock, Label, Input, Wrapper } from "./AdditionStyled";
import { getJsonValue } from "./utils/getJsonValue";
import { useDispatch, useSelector } from "react-redux";
import { category, good } from "./redux/selectors";
import { addItem, changeCategory, changeGood } from "./redux/actions";
import { useFileReader } from "./utils/useFileReader";


export const Addition = () => {
  
  const [itemNumber, setItemNumber] = useState(1);
  const [file, setFile] = useState(null);
 const [itemsAddition, setItemsAddition] = useState(new Set([1]));
  const dispatch = useDispatch();
const categoryValue = useSelector (category);
const goodsValue = useSelector(good);
const fileDataURL = useFileReader(file,itemNumber)



  const handleCategoryChange = (event) => {
   dispatch(changeCategory( event.target.value));
   };



   const getValueForGoodsValue = useCallback((...theArgs) => ({
    name: theArgs[0],
    number: theArgs[1],
    image:theArgs[2],
    id:categoryValue + theArgs[0] + Date(),
    key:theArgs[3]
  }),[]);

  const getUpdatedGoodsValue = useCallback ((good,value,id) => {
    
    let updateGoodsValue = [...goodsValue];
           if (good.length > 0) {
            updateGoodsValue = updateGoodsValue.map(goodValue=>goodValue.key===id? value: goodValue);
          } else {
            updateGoodsValue.push(value)
          }
          dispatch(changeGood(updateGoodsValue))
  },[goodsValue]);
  
   const handleChange = useCallback ((event,id) => {
   if (event.target.id ==="image") {
      const file = event.target.files[0];
     setFile(file);
    }
    const good = (goodsValue?.filter(good => good.key === id));
    
    const name = event.target.id === "name" ?  event.target.value :  (good[0]?.name ||  "");
    const number = event.target.id === "number" ?  event.target.value :  (good[0]?.number || "");
    const image = event.target.id === "image" ?  fileDataURL?.get(id) :  (good[0]?.image || "");
     const value = getValueForGoodsValue (name, number, image,id);
    getUpdatedGoodsValue(good,value,id);
   
     },[goodsValue]);




   const handleSubmit = (event) => {
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
   localStorage.setItem("shoppingList", JSON.stringify(newShoppingList));
  };

  const handleAdd = useCallback (() => {
    const num = Array.from(itemsAddition).reduce( (accumulator, currentValue) => accumulator + currentValue);
    const newValueSet = itemsAddition.size > 0 ? itemsAddition.size + num : 1;
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.add (newValueSet);
    setItemsAddition(new Set (updatedItemsAddition));
  },[itemsAddition]);

  const handleRemove = useCallback ((item) => {
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.delete (item);
    setItemsAddition(new Set (updatedItemsAddition));
    const newGoodsValue = goodsValue;
    const updatedGoodsValue = newGoodsValue.filter(goodValue=>goodValue.key!==item);
    dispatch(changeGood(updatedGoodsValue));
    setFile(null)
  },[itemsAddition])
  
  const getItemNumber = useCallback ((item) => {
    setItemNumber(item);
  },[itemNumber])

const getFile = useCallback ((file) => setFile(file),[file]);

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
            <FormBody item={item} id={item} key = {index} getFile={getFile} handleChange={handleChange} itemsAddition={itemsAddition} itemNumber={itemNumber} file={file} getItemNumber={getItemNumber} handleRemove={handleRemove}  fileDataURL={fileDataURL} getValueForGoodsValue={getValueForGoodsValue} getUpdatedGoodsValue={getUpdatedGoodsValue}/>
          
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
