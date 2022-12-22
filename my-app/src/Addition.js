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
  const [date, setDate] = useState(new Map ());
  const [goodsValue, setGoodsValue] = useState("");
  const [itemsAddition, setItemsAddition] = useState(new Set([1]));

  const handleChange = (event, id) => {
    
const category = event.target.id === "category" ?  event.target.value :  (date?.get(id)?.category || "");
const goods = event.target.id === "goods" ?  event.target.value :  (date?.get(id)?.goods || "");

    const updateValue = new Map (date);

      updateValue.set(id, {
        category: category,
        goods: goods
      })
    
    setDate(new Map(updateValue));
    console.log(date)

///

   event.target.id === "category"
      ? setCategoryValue(event.target.value)
      : setGoodsValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateWithDay = date;
    dateWithDay.set("day", {day: new Date ()});
     let shoppingList=[];
     (Array.from(dateWithDay)).forEach((list => {
      shoppingList.push(...list)
      }))
console.log(shoppingList.filter(list=>typeof(list)==="object"));

   // localStorage.setItem("shoppingList", JSON.stringify(Array.from(shoppingList)));
    
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
    const updateValue = new Map (date);
    updateValue.delete(item);
    setDate(() => new Map (updateValue));
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      {Array.from(itemsAddition).map((item) => (
        <div style={{display: "flex", margin: "15px"}}>
        <FormBody 
        key={item} 
        id={item}
        categoryValue={date?.get(item)?.category || ""}
        goodsValue={date?.get(item)?.goods || ""}
        handleChange={(event) => handleChange(event, item)}/>
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
