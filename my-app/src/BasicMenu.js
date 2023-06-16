import * as React from "react";
import { CloseIconAddition, MuiMenu } from "./AdditionStyled";
import { DragCategory } from "./dragCategory";
import { Items } from "./Items";

export default function BasicMenu({
  list,
  handleDeleteItem,
  editCategory,
  index,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listHeight, setListHeight] = React.useState(100);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    list?.goods?.length > 0 && (
      <>
        <DragCategory
          index={index}
          handleClick={handleClick}
          list={list}
        />
        <MuiMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          listheight={listHeight}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <CloseIconAddition
            style={{ marginBottom: "10px", alignSelf: "center" }}
            onClick={() => handleClose()}
          />
          <Items
            list={list}
            handleDeleteItem={handleDeleteItem}
            editCategory={editCategory}
            findListHeight={setListHeight}
          />
        </MuiMenu>
      </>
    )
  );
}
