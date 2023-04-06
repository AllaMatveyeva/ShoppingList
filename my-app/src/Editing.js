import { useEffect } from "react"
import { ButtonBlock} from "./AdditionStyled"
import { Button } from "./Button"
import { FormBody } from "./FormBody"
import {declineButtonText, saveButtonText } from "./buttonText"

export const Editing = ({handleClose, handleChange, goodValue, id, editCategory, file,getFile,getFileDataUrl, fileDataURL}) => {
const getItemNumber = () => goodValue.id;

useEffect(()=>{
    file && getFile(file)
},[file])

    return (
      <>
       <FormBody image={goodValue.image}  fileDataURL={fileDataURL} getFileDataUrl={getFileDataUrl} idCategory={id} editCategory={editCategory} handleChange={handleChange} itemNumber={goodValue.number} getFile={getFile} file={file} getItemNumber={getItemNumber} val={goodValue}  item={goodValue.number}/>
       <ButtonBlock>
       
       <Button buttonText={declineButtonText} min="min" onClick={handleClose}></Button>
       <Button buttonText={saveButtonText} min="min" onClick={(e)=>handleClose(e,true)} ></Button>
       </ButtonBlock>
       </>

    )
}