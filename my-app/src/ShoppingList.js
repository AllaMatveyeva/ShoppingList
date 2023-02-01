import { useState, useEffect, useCallback } from "react";
import {useSelector} from "react-redux"
import styled from "styled-components";
import { Addition } from "./Addition";
import BasicMenu from "./BasicMenu";
import { Button } from "./Button";
import { addItemButtonText } from "./buttonText";
import { Modal } from "./Modal";
import { useDrop } from 'react-dnd'
import { ItemTypes } from "./React DnD/dragTypes";
import update from 'immutability-helper'
import { shopList } from "./redux/selectors";
import { getJsonValue } from "./utils/getJsonValue";


const shoppingList = getJsonValue("shoppingList");
export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

export const ShoppingList = (props) => {
  const [open, setOpen] = useState(false);
  const [shoppingListView, setShoppingListView] = useState(shoppingList);
//const shopListState = useSelector(shopList);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
   const isEveryEmpty = shoppingListView?.every((item) => item?.goods?.length === 0);
    isEveryEmpty && localStorage.clear("shoppingList");
  }, [shoppingListView]);

  const handleDeleteItem = (list, item) => {
    const updateShop = new Array(...shoppingListView);
    const categorySelect = updateShop.filter(
      (shoppingListView) => shoppingListView.category === list.category
    );
    const goodSelect = (categorySelect[0].goods).filter(
     (good) => good.id !== item
    );
    const result = updateShop.map((shoppingListView) =>
    shoppingListView.category === list.category
        ? new Object({ category: shoppingListView.category, goods: goodSelect })
        : shoppingListView
    );
    setShoppingListView(result);
    localStorage.setItem("shoppingList", JSON.stringify(result));
  };

  const findCategory = useCallback(
    (id) => {
      let categoryIndex = "";
      const category = shoppingListView.find((category,index) => { 
        const isCurrentCategory = `${category.categoryId}` === id;
        if (isCurrentCategory) {categoryIndex = index};
        return `${category.categoryId}` === id});

      return {
        category,
        index: categoryIndex,
      }
    },
    [shoppingListView],
  )

  const moveCategory = useCallback(
    (id, atIndex) => {
      const { category, index } = findCategory(id);
      const updateShoppingListView = update(shoppingListView, {
        $splice: [
          [index, 1],
          [atIndex, 0, category[0] || category],
        ],
      });
      setShoppingListView (updateShoppingListView);
localStorage.setItem("shoppingList", JSON.stringify(updateShoppingListView))},
    [findCategory, shoppingListView, setShoppingListView],);


const deleteCategory = useCallback(
    (id) => {
      const { index } = findCategory(id);
      const updateShoppingListView =new Array (...shoppingListView);
      updateShoppingListView.splice(index,1);
      setShoppingListView (updateShoppingListView);
localStorage.setItem("shoppingList", JSON.stringify(updateShoppingListView))},
    [findCategory, shoppingListView, setShoppingListView],);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CATEGORY}));
    


  return (
    <>
      {!open ? (
        <Container 
        >
          <div className="categoryBlock" ref={drop}
          >
            {shoppingListView &&
              shoppingListView.map((list,index) => (
                <BasicMenu
                  list={list}
                  key={index}
                  id={list.categoryId}
                  originalIndex={index}
                  handleDeleteItem={handleDeleteItem}
                  findCategory={findCategory}
                  moveCategory={moveCategory}
                  deleteCategory={deleteCategory}
                />
              ))}
          </div>
           <Button onClick={handleOpen} buttonText={addItemButtonText}></Button>
        </Container>
      ) : (
        <Modal close={handleClose}>
          <Addition close={handleClose} />
        </Modal>
      )}
    </>
  );
};
