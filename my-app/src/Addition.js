import { useEffect, useRef, useState } from "react";
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
  //const [categoryValue, setCategoryValue] = useState("");
  const [fileDataURL, setFileDataURL] = useState(new Map());
  const [itemNumber, setItemNumber] = useState(1);
  const [file, setFile] = useState(null);
 // const [goodsValue, setGoodsValue] = useState([]);
 // const [goodsValue, setGoodsValue] = useState(new Map());
  const [itemsAddition, setItemsAddition] = useState(new Set([1]));
  const dispatch = useDispatch();
const categoryValue = useSelector (category);
const goodsValue= useSelector(good);
//const goodsValue = useSelector(good);

  useEffect (() => {
    let fileReader, isCancel = false;
    fileReader = new FileReader();
   if (file) {
      fileReader.onload = (e)=> {
        const {result} = e.target;
        if (result && !isCancel) {
          setFileDataURL( getNewMapValue(fileDataURL,itemNumber,result));
         
         const good = goodsValue.filter(good=>good.key ===itemNumber);
         console.log(good)
         const value = getValueForGoodsValue(good[0]?.name, good[0]?.number, result,itemNumber);
         
         let updateGoodsValue = [...goodsValue];
         if (good.length > 0) {
          updateGoodsValue = updateGoodsValue.map(goodValue=>goodValue.key===itemNumber? value: goodValue);
        } else {
          updateGoodsValue.push(value)
        }
         
        dispatch(changeGood(updateGoodsValue))
        // setGoodsValue(getNewMapValue(goodsValue, itemNumber,value));
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
  },[file]);

 
  const getValueForGoodsValue = (...theArgs) => ({
    name: theArgs[0],
    number: theArgs[1],
    image:theArgs[2],
    id:categoryValue + theArgs[0] + Date(),
    key:theArgs[3]
  });

  const handleCategoryChange = (event) => {
   dispatch(changeCategory( event.target.value));
   };

  const handleChange = (event,id) => {
    
if (event.target.id ==="image") {
  const file = event.target.files[0];
 setFile(file);
}
//const good = goodsValue?.get(id);
let updateGoodsValue = [...goodsValue];
const good = (updateGoodsValue?.filter(goodValue=>goodValue.key===id));
const name = event.target.id === "name" ?  event.target.value :  (good[0]?.name || "");
const number = event.target.id === "number" ?  event.target.value :  (good[0]?.number || "");
const image = event.target.id === "image" ?  fileDataURL.get(id) :  (good[0]?.image || "");
const value = getValueForGoodsValue (name, number, image,id);

if (good.length > 0) {
  updateGoodsValue = updateGoodsValue.map(goodValue=>goodValue.key===id? value: goodValue);
} else {
  updateGoodsValue.push(value)
}
 
dispatch(changeGood(updateGoodsValue))
//setGoodsValue(updateGoodsValue);
 };

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
    dispatch(changeGood(updatedGoodsValue))
  }
  
  const getItemNumber =(item) => {
    setItemNumber(item);
  }
//const goods = goodsValue;

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
            <FormBody item={item} id={item} key = {index} itemsAddition={itemsAddition} fileDataURL={fileDataURL}  handleChange={handleChange} getItemNumber={getItemNumber} handleRemove={handleRemove}/>
          
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
