import { useSelector } from "react-redux";
import {
  GoodImg,
  Label,
  Input,
  CloseIconAddition,
  WrapperFormBody,
  DeleteIcon,
} from "./AdditionStyled";
import { good } from "./redux/selectors";

export const FormBody = ({
  item,
  handleChange,
  fileDataURL,
  itemsAddition,
  getItemNumber,
  handleRemove,
  value,
  image,
  labelText,
  
}) => {
 
  const goods = useSelector(good);
  const goodValue=(goods.filter(good=>good.key===item))[0];
  console.log(goodValue)
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
        <Label htmlFor="name">{labelText}</Label>
        {itemsAddition?.size > 1 && (
          <DeleteIcon onClick={() => handleRemove(item)} />
        )}
      </div>
      <WrapperFormBody key={item}>
        {getBody("text", value?.name || goodValue?.name || "", "name", "good's name", true)}
        {getBody("number", value?.number || goodValue?.number || "","number","number",false,"65px","1" )}
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
