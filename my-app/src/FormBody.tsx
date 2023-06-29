import React from "react";
import { memo, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  GoodImg,
  Label,
  Input,
  CloseIconAddition,
  WrapperFormBody,
} from "./AdditionStyled";

import { good } from "./redux/selectors";
import { Goods, ShoppingListView } from "./ShoppingList";

interface FormBodyProps {
        image: string
        fileDataURLEdit: Map<any, any>
        handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void
        itemNumber: number
        getFile: (file: File) => void
        file: File | undefined
        getItemNumber:  (item:number) => string
        updatedGood: Goods
        getUpdatedGoods: (good:Goods[], value:Goods,id:string |number) => void
        item: number
        itemsAddition: Set<number>
        handleRemove: (item: number) => void
        getGoods: (name:string, number: number, image: string, id: number) => Goods
        fileDataURL: Map<any, any>
}

export const FormBody = memo (function FormBody({ 
  item,
  itemsAddition,
  getItemNumber,
  handleRemove,
  updatedGood,
  image,
  itemNumber,
  handleChange,
  getGoods,
  getUpdatedGoods,
  fileDataURL,
  fileDataURLEdit 
}:FormBodyProps) {
 const goods = useSelector(good) as Array<Goods>;
 console.log(goods)
 const goodValue = useMemo(() => (goods.filter(good=>good.key===item))[0],[goods,item]);
 
 

 useEffect(()=> {
  if (fileDataURL)  {
     const good = goods?.filter(good => good.key === itemNumber);
    
    if (getUpdatedGoods) {
         const value = getGoods(good[0]?.name || goodValue?.name, good[0]?.number || goodValue?.number, fileDataURL.get(itemNumber),itemNumber);
         getUpdatedGoods(good,value,itemNumber);}
  };
  },[fileDataURL])

  const getBody = (
    type:string,
    value:string | number,
    id:string,
    placeholder:string,
    required:boolean,
    size?:string,
    min?:string,
    accept?:string
  ) => {
    return (
      <Input
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item)}
        theArgs
        required={required}
        size={size}
        min={min}
        accept={accept}
      />
    );
  };
  
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Label htmlFor="name">Enter good:</Label>
        {itemsAddition?.size > 1 && (
          <CloseIconAddition onClick={() => handleRemove(item)} />
        )}
      </div>
      <WrapperFormBody key={item}>
        {getBody("text", goodValue?.name || updatedGood?.name || "", "name", "good's name", true)}
        {getBody("number",goodValue?.number || updatedGood?.number || "","number","number",false,"65px","1" )}
        {getBody("file","","image","image",false, "","", "image/*")}
        <Label 
          htmlFor="image"
          onClick={() => getItemNumber(item)}
          style={{ marginBottom: "10px" }}
        >
          {fileDataURLEdit?.get(item) || fileDataURL?.get(item)   || image ? (
            <GoodImg
              src={fileDataURLEdit?.get(item) || fileDataURL?.get(item) || image}
              alt="Good image"
              width="50"
              height="50"
            />
          ) : (
            <span style={{ cursor: "pointer" }}>Load good image</span>
          )}
        </Label>
      </WrapperFormBody>
      <hr />
    </>
  );
});

