import { useEffect, useState } from "react";
import { getNewMapValue } from "./getNewMapValue";

export const useFileReader = (file,id) => {
    const [fileDataURL, setFileDataURL] = useState();
    
    useEffect(()=>{
        let fileReader, isCancel = false;
        fileReader = new FileReader();
       if (file) {
          fileReader.onload = (e)=> {
            const {result} = e.target;
            if (result && !isCancel) {
              setFileDataURL(getNewMapValue(fileDataURL,id,result));
            }
        }
        fileReader.readAsDataURL(file);
    }
    return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
    },[file])
return fileDataURL
}