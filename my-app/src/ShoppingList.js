import { useState, useEffect } from "react";
import styled from "styled-components";
import { Addition } from "./Addition";
import BasicMenu from "./BasicMenu";
import { Button } from "./Button";
import { addItemButtonText } from "./buttonText";
import { Modal } from "./Modal";


const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

export const ShoppingList = (props) => {
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState(shoppingList);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const isEveryEmpty = shop?.every((item) => item.goods.length === 0);
    isEveryEmpty && localStorage.clear("shoppingList");
  }, [shop]);

  const handleDeleteItem = (list, item) => {
    const updateShop = new Array(...shop);
    const categorySelect = updateShop.filter(
      (shop) => shop.category === list.category
    );
    const goodSelect = (categorySelect[0].goods).filter(
     (good) => good.id !== item
    );
    const result = updateShop.map((shop) =>
      shop.category === list.category
        ? new Object({ category: shop.category, goods: goodSelect })
        : shop
    );
    setShop(result);
    localStorage.setItem("shoppingList", JSON.stringify(result));
  };

  return (
    <>
      {!open ? (
        <Container
        >
          <div>
            {shop &&
              shop.map((list, index) => (
                <BasicMenu
                  list={list}
                  key={index}
                  handleDeleteItem={handleDeleteItem}
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
