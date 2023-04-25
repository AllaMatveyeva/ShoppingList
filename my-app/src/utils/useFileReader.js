import { useEffect, useState } from "react";

export const useFileReader = (file) => {
    const [fileDataURL, setFileDataURL] = useState();

    useEffect(()=>{
        let fileReader, isCancel = false;
        fileReader = new FileReader();
       if (file) {
          fileReader.onload = (e)=> {
            const {result} = e.target;
            if (result && !isCancel) {
              setFileDataURL(result);
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
    })
return fileDataURL
}