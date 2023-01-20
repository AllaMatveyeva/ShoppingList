import {
  GoodImg,
  Label,
  Input,
  InputFile,
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
  console.log(item);

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
        <Input
          type="text"
          value={goodsValue.name}
          id="name"
          placeholder="good's name"
          required
          onChange={(event) => handleChange(event, item)}
        />
        <Input
          type="number"
          id="number"
          value={goodsValue.number}
          size="65px"
          min="1"
          placeholder="number"
          onChange={(event) => handleChange(event, item)}
        />
        <InputFile
          type="file"
          id="image"
          accept="image/*"
          placeholder="image"
          value={goodsValue.image}
          onChange={(event) => handleChange(event, item)}
        ></InputFile>
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
            "Load good image"
          )}{" "}
        </Label>
      </WrapperFormBody>
      <hr />
    </>
  );
};