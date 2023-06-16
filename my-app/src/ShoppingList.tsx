import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addition } from "./Addition";
import BasicMenu from "./BasicMenu";
import { Button } from "./Button";
import { addItemButtonText } from "./buttonText";
import { Modal } from "./Modal";
import { isMobile } from "react-device-detect";
import { getJsonValue } from "./utils/getJsonValue";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Container, List, TrashContainer, TrashImg } from "./AdditionStyled";
import { createPortal } from "react-dom";
import Trash from "./img/trash.png";
import { useMemo } from "react";
import { category } from "./redux/selectors";
import React from "react";

const trash = Trash;


interface Goods {
name: string;
number: string;
image: string;
id: string;
}

interface ShoppingListView {
category: string;
categoryId: string;
day: string;
goods: Array<Goods>;
};

const shoppingList:Array<ShoppingListView> = getJsonValue("shoppingList");

export const ShoppingList = () => {
  const [open, setOpen] = useState(false);
  const [shoppingListView, setShoppingListView] = useState<Array<ShoppingListView>>(shoppingList);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const isEveryEmpty = useMemo(()=>
  shoppingListView?.every(
    (item) => item?.goods?.length === 0, shoppingListView),[])

  

  const handleDeleteItem = useCallback (
    (list:ShoppingListView, item:string) => {
      const updatedShop = new Array(...shoppingListView);
      const categorySelect = updatedShop.filter(
        (shoppingListView) => shoppingListView.category === list.category
      ) as Array<ShoppingListView>;
      
      const goodSelect = categorySelect[0].goods.filter(
        (good:Goods) => good.id !== item
      ) as Array<Goods>;
      const result = updatedShop.map((shoppingListView) =>
        shoppingListView.category === list.category
          ? ({
              category: shoppingListView.category,
              categoryId: shoppingListView.categoryId,
              goods: goodSelect,
            })
          : shoppingListView
      ) as Array<ShoppingListView>;

      setShoppingListView((result));

      localStorage.setItem("shoppingList", JSON.stringify(result));
    },
    [shoppingListView, dispatch]
  );

  const findCategory = useCallback(
    (id:string) => {
      let categoryIndex: number=0;

      const category = shoppingListView.find((category, index) => {
        const isCurrentCategory = `${category.categoryId}` === id;
        if (isCurrentCategory) {
          categoryIndex = index;
        }
        return `${category.categoryId}` === id;
      });

      return {
        category,
        index: categoryIndex,
      };
    },
    [shoppingListView]
  );

  const moveCategory = useCallback(
     (start:number,finish:number) => {
    const result = shoppingListView;

      const [removed] = result.splice(start, 1);
      result.splice(finish, 0, removed);
      setShoppingListView(result);
      localStorage.setItem(
        "shoppingList",
        JSON.stringify(result)
      );
    },
    [findCategory, shoppingListView]
  );

  const deleteCategory = useCallback(
    (start:number) => {
      const result = shoppingListView;
      result.splice(start,1);
      result.length > 0 && setShoppingListView(result);
      result.length > 0 ? localStorage.setItem (
        "shoppingList",
        JSON.stringify(result)
      ) : localStorage.removeItem("shoppingList")
    },
    [ shoppingListView]
  );

  const editCategory = useCallback(
    (id:string, item:ShoppingListView) => {
      const { index }  = findCategory(id);
      const updateShoppingListView = new Array(...shoppingListView);
      updateShoppingListView.splice(index, 1, item);
      setShoppingListView(updateShoppingListView);
      localStorage.setItem(
        "shoppingList",
        JSON.stringify(updateShoppingListView)
      );
    },
    [findCategory, shoppingListView, setShoppingListView]
  );

 let deleteArea = "hidden";

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.droppableId === "delete") {
      deleteCategory(source.index);
     } else {
    moveCategory(source.index, destination.index);
    };
    deleteArea = "hidden";
  };

  const handleDragStart = (props) => {
    deleteArea = "visible"
  };

  const handleDragUpdate = () => {

  };
  
  useEffect(() => {
    isEveryEmpty && localStorage.removeItem("shoppingList");
  }, [shoppingListView,Droppable]);

  return !open ? (
    <Container>
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      >

      <Droppable droppableId="delete">
        {(provided, snapshot) => (
          createPortal(
          <TrashContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            deleteArea={deleteArea}
            >
            <TrashImg src={trash} alt = "trash" isMobile={isMobile}/>
          </TrashContainer>, document.getElementById('root')
          )
        )}
      </Droppable>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {shoppingListView &&
              shoppingListView.map((list, index) => {
              return (
                <BasicMenu
                  list={list}
                  key={list?.categoryId}
                  id={list?.categoryId}
                  originalIndex={index}
                  handleDeleteItem={handleDeleteItem}
                  findCategory={findCategory}
                  moveCategory={moveCategory}
                  deleteCategory={deleteCategory}
                  editCategory={editCategory}
                  index={index}
                />
              )})}
              {provided.placeholder}
  </List>
        )}
      </Droppable>
    </DragDropContext>
            <Button
              onClick={handleOpen}
              buttonText={addItemButtonText}/>
              
            </Container>

  )

  : (
    <Modal close={handleClose}>
      <Addition close={handleClose} />
    </Modal>
  );
};


