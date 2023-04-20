import { useEffect, useState } from "react"
import { ButtonBlock} from "./AdditionStyled"
import { Button } from "./Button"
import { FormBody } from "./FormBody"
import {declineButtonText, saveButtonText } from "./buttonText"
import { useFileReader } from "./useFileReader"

export const Editing = ({id, editCategory,categoryId, currentGood,list, closeWindow}) => {
const getItemNumber = () => updatedGood.id;
const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState();
    const getFile = (file) => setFile(file);

    
    const getFileDataUrl = (url) => {
         setFileDataURL(url);
      };
    
const [updatedGood, setUpdatedGood] = useState({
  name: currentGood.name,
  number:currentGood.number,
  image: currentGood.image
})




const handleChange = (e,id) => {
const target = e.target;
const name = target.id;

if (name ==="image") {
  const file = e.target.files[0];
   setFile(file);
 }

 setUpdatedGood({...currentGood,
 [name]:name ==="image" ? fileDataURL : target.value
}
)
}

useEffect(() => {
  setUpdatedGood({...updatedGood,
        "image": fileDataURL || updatedGood.image
       }
       )
},[fileDataURL]);

const update = (list.goods).map((good) => {
if (good.id !== updatedGood.id) {return good} else {
return ({
id: good.id,
image: updatedGood.image,
key: good.key,
name: updatedGood.name,
number: updatedGood.number,
})}});


const newGood = {
...list,
goods: update
};



const handleClose = (e,edit) => {
 if (edit) editCategory(categoryId,newGood);
  closeWindow()

} 
useEffect(()=>{
    file && setFile(file)
},[file])

    return (
      <>
       <FormBody image={updatedGood.image}  fileDataURLEdit={fileDataURL} getFileDataUrl={getFileDataUrl} idCategory={id} editCategory={editCategory} handleChange={handleChange} itemNumber={updatedGood.number} getFile={getFile} file={file} getItemNumber={getItemNumber} updatedGood={updatedGood}  item={updatedGood.number}/>
       <ButtonBlock>
       
       <Button buttonText={declineButtonText} min="min" onClick={handleClose}></Button>
       <Button buttonText={saveButtonText} min="min" onClick={(e)=>handleClose(e,true)} ></Button>
       </ButtonBlock>
       </>

    )
}