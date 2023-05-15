import { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoodImg,
  Label,
  Input,
  CloseIconAddition,
  WrapperFormBody,
} from "./AdditionStyled";

import { good } from "./redux/selectors";
import { useFileReader } from "./utils/useFileReader";

export const FormBody = memo (function FormBody({ item,
  itemsAddition,
  getItemNumber,
  handleRemove,
  updatedGood,
  image,
  file,
  itemNumber,
  handleChange,
  getValueForGoodsValue,
  getUpdatedGoodsValue,
  fileDataURL,
  fileDataURLEdit 
}) {
 const goods = useSelector(good);
 const goodValue = useMemo(() => (goods.filter(good=>good.key===item))[0],[goods,item]);
 
 

 useEffect(()=> {
  if (fileDataURL)  {
    //getFileDataUrl(url)
  
    const good = goods?.filter(good => good.key === itemNumber);
    
    if (getUpdatedGoodsValue) {
         const value = getValueForGoodsValue(good[0]?.name || goodValue?.name , good[0]?.number || goodValue?.number, fileDataURL.get(itemNumber),itemNumber);
         getUpdatedGoodsValue(good,value,itemNumber);}
  };
  },[fileDataURL])

  const getBody = (
    type,
    value,
    id,
    placeholder,
    required,
    size,
    min,
    accept
  ) => {
    return (
      <Input
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, item)}
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
              src={fileDataURLEdit?.get(item) || fileDataURL?.get(item)   || image}
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
