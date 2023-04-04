import { useEffect, useState } from "react"
import { ButtonBlock, GoodImg, Input, Label } from "./AdditionStyled"
import { Button } from "./Button"
import { FormBody } from "./FormBody"
import {declineButtonText, saveButtonText } from "./buttonText"
export const Editing = ({handleClose, handleChange, goodValue}) => {
    const [file, setFile] = useState(null);
console.log(goodValue)
const getItemNumber = () => goodValue.id;
const getFile = (file) => setFile(file);

useEffect(()=>{
    file && setFile(file)
},[file])

    return (
      <>
       <FormBody image={goodValue.image} itemNumber={goodValue.number} getFile={getFile} file={file} getItemNumber={getItemNumber} val={goodValue}  item={goodValue.number}/>
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