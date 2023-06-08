import { Modal } from "./Modal";
import { useState } from "react";
import { Editing } from "./Editing";
import Trash from "./img/trash.png";
import { ItemValue, MuiMenuItem } from "./AdditionStyled";

const trash = Trash;

export const Item = ({
  good,
  list,
  handleDeleteItem,
  editCategory,
  findListHeight,
}) => {
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const categoryId = list.categoryId;
  const closeWindow = () => setOpenEditWindow(false);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {openEditWindow ? (
        <Modal edit="true" close={closeWindow}>
          <hr style={{ width: "105%" }} />
          <Editing
            currentGood={good}
            id={categoryId}
            editCategory={editCategory}
            list={list}
            categoryId={categoryId}
            closeWindow={closeWindow}
            findListHeight={findListHeight}
          ></Editing>
        </Modal>
      ) : (
        <>
          <MuiMenuItem onClick={() => setOpenEditWindow(true)}>
            <ItemValue as="div">{good.name}</ItemValue>
            {good.number && <ItemValue as="div">amount: {good.number}</ItemValue>}
            {good.image && (
              <ItemValue
                as="img"
                src={good.image}
                alt="good"
                width="50"
                height="50"
               />
            )}
          </MuiMenuItem>
          <img
            src={trash}
            width="20px"
            height="20px"
            alt="trash"
            style={{ marginRight: "25px" }}
            onClick={() => handleDeleteItem(list, good.id)}
          />
        </>
      )}
    </div>
  );
};
