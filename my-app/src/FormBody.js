import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoodImg,
  Label,
  Input,
  CloseIconAddition,
  WrapperFormBody,
} from "./AdditionStyled";
import { changeGood } from "./redux/actions";
import { category, good } from "./redux/selectors";
import { useFileReader } from "./useFileReader";
import { getNewMapValue } from "./utils/getNewMapValue";

export const FormBody = ({
  item,
  itemsAddition,
  getItemNumber,
  handleRemove,
  val,
  image,
  file,
  itemNumber,
  getFile
}) => {
 
  const goods = useSelector(good);
  const [valueforEdit,setValueForEdit] = useState(val)
  const categoryValue = useSelector (category);
  const dispatch = useDispatch();
  const goodValue=(goods.filter(good=>good.key===item))[0];
 const url = useFileReader(file);
  const [fileDataURL, setFileDataURL] = useState(new Map());

  const getValueForGoodsValue = (...theArgs) => ({
    name: theArgs[0],
    number: theArgs[1],
    image:theArgs[2],
    id:categoryValue + theArgs[0] + Date(),
    key:theArgs[3]
  });

  const getUpdatedGoodsValue = (good,value,id) => {
    let updateGoodsValue = [...goods];
           if (good.length > 0) {
            updateGoodsValue = updateGoodsValue.map(goodValue=>goodValue.key===id? value: goodValue);
          } else {
            updateGoodsValue.push(value)
          }
          dispatch(changeGood(updateGoodsValue))
  };
  
   const handleChange = (event,id) => {
    
    if (event.target.id ==="image") {
      const file = event.target.files[0];
     getFile(file);
    }
    const good = (goods?.filter(good => good.key === id));
    const name = event.target.id === "name" ?  event.target.value :  (good[0]?.name || "");
    const number = event.target.id === "number" ?  event.target.value :  (good[0]?.number || "");
    const image = event.target.id === "image" ?  fileDataURL.get(id) :  (good[0]?.image || "");
    const value = getValueForGoodsValue (name, number, image,id);
    setValueForEdit({
      name:name,
      number:number,
      image:image
    })
    getUpdatedGoodsValue(good,value,id);
    };

  useEffect(()=> {
  if (url)  {setFileDataURL(getNewMapValue(fileDataURL,itemNumber,url));
    const good = goods.filter(good => good.key === itemNumber);
         const value = getValueForGoodsValue(good[0]?.name, good[0]?.number, url,itemNumber);
         getUpdatedGoodsValue(good,value,itemNumber);
  }
  },[url])

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
        onChange={(event) => handleChange(event, item)}
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
        {getBody("text", valueforEdit?.name || "", "name", "good's name", true)}
        {getBody("number", valueforEdit?.number || goodValue?.number || "","number","number",false,"65px","1" )}
        {getBody("file","","image","image",false, "","", "image/*")}
        <Label
          htmlFor="image"
          onClick={() => getItemNumber(item)}
          style={{ marginLeft: "20px", marginBottom: "10px" }}
        >
          {fileDataURL?.has(item) || image ? (
            <GoodImg
              src={fileDataURL?.get(item) || image}
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
};
