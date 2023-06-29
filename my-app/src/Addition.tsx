import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./Button.tsx";
import { addbuttonText, saveButtonText } from "./buttonText.tsx";
import  {FormBody } from "./FormBody.tsx";
import { Form, Submit, ButtonBlock, Label, Input, Wrapper } from "./AdditionStyled";
import { getJsonValue } from "./utils/getJsonValue.tsx";
import { useDispatch, useSelector } from "react-redux";
import { category, good } from "./redux/selectors";
import { addItem, changeCategory, changeGood } from "./redux/actions";
import { useFileReader } from "./utils/useFileReader.tsx";
import { resizeFile } from "./utils/getResizeImage.tsx";
import React from "react";
import { Goods, ShoppingListView } from "./ShoppingList";


export const Addition = () => {
  
  const [itemNumber, setItemNumber] = useState(1);
  const [file, setFile] = useState<File>();
 const [itemsAddition, setItemsAddition] = useState(new Set([1]));
  const dispatch = useDispatch();
const categoryValue = useSelector (category);
const goodsValue = useSelector(good);
const fileDataURL = useFileReader(file,itemNumber)

const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   dispatch(changeCategory( event.target.value));
   };



   const getGoods = useCallback((...theArgs):Goods => ({
    name: theArgs[0],
    number: theArgs[1],
    image:theArgs[2],
    id:categoryValue + theArgs[0] + Date(),
    key:theArgs[3]
  }),[]);

  const getUpdatedGoods = useCallback ((good:Goods[],value:Goods,id:number):void => {
    let updatedGoodsValue = [...goodsValue];
           if (good.length > 0) {
            updatedGoodsValue = updatedGoodsValue.map(goodValue=>goodValue.key===id ? value: goodValue);
          } else {
            updatedGoodsValue.push(value)
          }
          dispatch(changeGood(updatedGoodsValue))
  },[goodsValue]);

  
  const handleChange = useCallback (async(event: { target: { id: string; files: File[]; value: any; }; },id:number):Promise<void> => {
    
    if (event.target.id ==="image") {
      let file: File = event.target.files[0];
      if (file.size > 200000) {
        file = await resizeFile(file);
      }
      setFile(file);
     }
     const good: Goods[] = (goodsValue?.filter((good: { key: number; }) => good.key === id));
     
     const name = event.target.id === "name" ?  event.target.value :  (good[0]?.name ||  "");
     const number = event.target.id === "number" ?  event.target.value :  (good[0]?.number || "");
     const image = event.target.id === "image" ?  fileDataURL?.get(id) :  (good[0]?.image || "");
     const value = getGoods (name, number, image,id);
     getUpdatedGoods(good,value,id);
    
      },[goodsValue,itemsAddition]);



   const handleSubmit = () => {
    const shoppingList: ShoppingListView[] = [{
      category: categoryValue,
      categoryId: categoryValue + Date(),
      goods: Array.from(goodsValue.values()),
      day: new Date(),
    }];

    const oldShoppingList : Array<ShoppingListView>= getJsonValue("shoppingList");
    oldShoppingList?.forEach((list) => {
    if ( list.category===shoppingList[0].category ) {
      shoppingList[0].goods=(shoppingList[0].goods).concat(list.goods);
    } })
    const updatedShoppingList = oldShoppingList?.filter(list=>list.category!==shoppingList[0].category);
   const newShoppingList = oldShoppingList ? shoppingList.concat(updatedShoppingList) : shoppingList;
   localStorage.setItem("shoppingList", JSON.stringify(newShoppingList));
  };

  const handleAdd = useCallback (() => {
    const num = Array.from(itemsAddition).reduce( (accumulator, currentValue) => accumulator + currentValue);
    const newValueSet = itemsAddition.size > 0 ? itemsAddition.size + num : 1;
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.add (newValueSet);
    setItemsAddition(new Set (updatedItemsAddition));
  },[itemsAddition]);

  const handleRemove = useCallback((item:number) => {
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.delete (item);
    setItemsAddition(new Set (updatedItemsAddition));
    const newGoodsValue = [...goodsValue];
   const updatedGoodsValue = newGoodsValue.filter(goodValue=>goodValue.key!==item);
    dispatch(changeGood(updatedGoodsValue));
    setFile(undefined)
  },[itemsAddition,goodsValue])
  
 


return (
    <Form autocomplete="off" onSubmit={handleSubmit}>
     <div style={{display: "flex", margin: "15px"}}>
         <Wrapper> 
          <div>
          <Label htmlFor="category">Enter category:</Label>
          <Input type="text"  placeholder="category" id="category" required onChange={(event)=>handleCategoryChange(event)}/>
          </div>
          {Array.from(itemsAddition).map((item,index) => {
            return (
            <FormBody item={item} id={item} key = {index} handleChange={handleChange} itemsAddition={itemsAddition} itemNumber={itemNumber} file={file} getItemNumber={setItemNumber} handleRemove={handleRemove}  fileDataURL={fileDataURL} getGoods={getGoods} getUpdatedGoods={getUpdatedGoods}/>
          
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
