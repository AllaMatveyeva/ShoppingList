import { useEffect, useState } from "react"
import { ButtonBlock, GoodImg, Input, Label } from "./AdditionStyled"
import { Button } from "./Button"
import { FormBody } from "./FormBody"
import {declineButtonText, getTextForLabel, saveButtonText } from "./text"
export const Editing = ({good, editCategory, list, handleClose, handleChange, goodValue}) => {
//     const [goodValue, setGoodValue] = useState({
//       name: good.name,
//       number:good.number,
//       image: good.image
//     })

//     const handleChange = (e) => {
//     const target = e.target;
//     const name = target.id;
//     console.log(goodValue)
//     setGoodValue({...goodValue,
//      [name]: target.value
//     }
//     )
//  }
 
// const update = (list.goods).map((goodLi)=>{
//   console.log(goodLi);
//   console.log(good)
//   if (goodLi.key == good.key) {return good} else {
// return ({
//   id: goodLi.id,
//   image: goodValue.image,
//   key: goodLi.key,
//   name: goodValue.name,
//   number: goodValue.number,
// })}});


// const newGood = {
//     ...list,
//     goods: update
//   };

//  const categoryId = list.categoryId;
 
// useEffect(()=> {
//   editCategory(categoryId,newGood)
// },[categoryId])

    return (
      <>
       <FormBody image={goodValue.image} value={goodValue} handleChange={(e) => handleChange(e)} item={good.key} labelText={getTextForLabel("edit")}/>
       <ButtonBlock>
       
       <Button buttonText={declineButtonText} min="min" onClick={handleClose}></Button>
       <Button buttonText={saveButtonText} min="min" onClick={(e)=>handleClose(e,true)} ></Button>
       </ButtonBlock>
       </>
//         <div
//         style={{
//           display: "flex",
//           width: "100%",
//           justifyContent: "space-between",
//         }}
//       >
// <Input type="text"  value = {value.name} name = "name" onChange={(e) => handleChange(e)}></Input>
// <Input type="number" value = {value.number} name="number" onChange={(e) => handleChange(e)}></Input>
// <Input type="file" id="image" accept="image/*" name="image" onChange={(e) => handleChange(e)}></Input>
// <Label
//           htmlFor="image"
//           style={{ marginLeft: "20px", marginBottom: "10px" }}
//         ></Label>
// <GoodImg
//               src={good.image}
//               alt="Good image"
//               width="50"
//               height="50"
//             />
// </div>
    )
}