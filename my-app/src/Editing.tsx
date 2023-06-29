import { SetStateAction, useEffect, useRef, useState } from "react";
import { ButtonBlock } from "./AdditionStyled";
import { Button } from "./Button.tsx";
import  {FormBody} from "./FormBody.tsx";
import { declineButtonText, saveButtonText } from "./buttonText.tsx";
import { useFileReader } from "./utils/useFileReader.tsx";
import React from "react";
import { Goods, ShoppingListView } from "./ShoppingList";


interface EditingProps {
id: number
editCategory: (id: string, object: ShoppingListView) => void
categoryId: string
currentGood: Goods
list:  ShoppingListView
closeWindow: () => void
findListHeight: (height:number | undefined) => void
}

export const Editing = ({
  id,
  editCategory,
  categoryId,
  currentGood,
  list,
  closeWindow,
  findListHeight,
}: EditingProps) => {
  const getItemNumber = () => updatedGood.id;
  const [file, setFile] = useState<File>();
  const fileDataURL = useFileReader(file, id);
  const getFile = (file: File) => setFile(file);
  const editingRef = useRef<HTMLDivElement>(null);

  const [updatedGood, setUpdatedGood] = useState<Goods>({
    ...currentGood
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const target = e.target;
    const name = target.id;
    
    if (target.files !== null && name === "image") {
      const file = target.files[0];
      setFile(file);
    } 

    setUpdatedGood({
      ...updatedGood,
      [name]: name === "image" ? fileDataURL?.get(id) : target.value,
    });
  };

  useEffect(() => {
    setUpdatedGood({
      ...updatedGood,
      image: fileDataURL?.get(id) || updatedGood.image,
    });
    file && setFile(file);
    findListHeight(editingRef.current?.clientHeight);
  }, [fileDataURL, file]);

 

  const handleClose = (edit: boolean) => {
    if (edit) {
      const update = list.goods.map((good) => {
        if (good.id !== updatedGood.id) {
          return good;
        } else {
          return {
            id: good.id,
            image: updatedGood.image,
            key: good.key,
            name: updatedGood.name,
            number: updatedGood.number,
          } as Goods;
        }
      });
    
      const newGood = {
        ...list,
        goods: update,
      };
      editCategory(categoryId, newGood)};
    closeWindow();
  };

  return (
    <div ref={editingRef}>
      <FormBody
        image={updatedGood.image}
        fileDataURLEdit={fileDataURL}
        editCategory={editCategory}
        handleChange={handleChange}
        itemNumber={updatedGood.number}
        getFile={getFile}
        file={file}
        getItemNumber={getItemNumber}
        updatedGood={updatedGood}
        item={updatedGood.number}
      />
      <ButtonBlock>
        <Button
          buttonText={declineButtonText}
          min="min"
          onClick={() => handleClose(false)}
        />
        <Button
          buttonText={saveButtonText}
          min="min"
          onClick={() => handleClose(true)}
        />
      </ButtonBlock>
    </div>
  );
};
