import { style } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonStyle } from "./Button";
import { addbuttonText, saveButtonText } from "./buttonText";
import { FormBody } from "./FormBody";
import { CloseIconMui } from "./Modal";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  font-family: roboto;
font-size: 17px;
`;
export const Submit = styled(ButtonStyle)``;

export const CloseIconAddition = styled(CloseIconMui)`
align-self: flex-start;
`;

export const ButtonBlock  = styled.div`
display: flex;
justify-content: space-between;
 margin-top: 15px;
`

export const Addition = ({ close }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [goodsValue, setGoodsValue] = useState("");
  const [itemsAddition, setItemsAddition] = useState(new Set([1]));

  const handleChange = (event) => {
    event.target.id === "category"
      ? setCategoryValue(event.target.value)
      : setGoodsValue(event.target.value);
  };

  const handleSubmit = (event) => {
    const item = {
      category: categoryValue,
      good: goodsValue,
    };

    event.preventDefault();
  };

  const handleAdd = () => {
    const num = itemsAddition.size > 0 ? itemsAddition.size + 1 : 1;
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.add (num);
    setItemsAddition(new Set (updatedItemsAddition));
  };

  const handleRemove = (item) => {
    const updatedItemsAddition = new Set (itemsAddition);
    updatedItemsAddition.delete (item);
    setItemsAddition(new Set (updatedItemsAddition));
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      {Array.from(itemsAddition).map((item) => (
        <div style={{display: "flex", margin: "15px"}}>
        <FormBody 
        key={item} 
        id={item}
        categoryValue={categoryValue}
        goodsValue={goodsValue}
        handleChange={handleChange}/>
        {itemsAddition.size > 1 &&
        <CloseIconAddition onClick= {() => handleRemove (item)}/>
}
        </div>
      ))}
      <ButtonBlock>
        <Button onClick={handleAdd} buttonText={addbuttonText} min />
        <Submit as="input" type="submit" value={saveButtonText} min />
      </ButtonBlock>
    </Form>
  );
};
