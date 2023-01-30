import {
  GoodImg,
  Label,
  Input,
  CloseIconAddition,
  WrapperFormBody,
} from "./AdditionStyled";

export const FormBody = ({
  item,
  goodsValue,
  handleChange,
  fileDataURL,
  itemsAddition,
  getItemNumber,
  handleRemove,
}) => {
  
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
        {itemsAddition.size > 1 && (
          <CloseIconAddition onClick={() => handleRemove(item)} />
        )}
      </div>
      <WrapperFormBody key={item}>
        {getBody("text", goodsValue.name, "name", "good's name", true)}
        {getBody("number", goodsValue.number,"number","number",false,"65px","1" )}
        {getBody("file",goodsValue.image,"image","image",false, "","", "image/*")}
        <Label
          htmlFor="image"
          onClick={() => getItemNumber(item)}
          style={{ marginLeft: "20px", marginBottom: "10px" }}
        >
          {fileDataURL.has(item) ? (
            <GoodImg
              src={fileDataURL.get(item)}
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
