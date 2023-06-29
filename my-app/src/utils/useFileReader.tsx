import { useEffect, useState } from "react";
import { getNewMapValue } from "./getNewMapValue.tsx";

export const useFileReader = (file: File | undefined, id: number) => {
  const [fileDataURL, setFileDataURL] = useState<Map<any, any>>();

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    fileReader = new FileReader();
    if (file) {
      fileReader.onload = () => {
        const result = fileReader.result;
        if (result && !isCancel) {
          setFileDataURL(getNewMapValue(fileDataURL, id, result));
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return fileDataURL;
};
