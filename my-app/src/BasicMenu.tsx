import * as React from "react";
import { CloseIconAddition, MuiMenu } from "./AdditionStyled";
import { DragCategory } from "./dragCategory.tsx";
import { Items } from "./Items.tsx";

export default function BasicMenu({
  list,
  handleDeleteItem,
  editCategory,
  index,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listHeight, setListHeight] = React.useState<number>();
  const open = Boolean(anchorEl);

  const handleClick = (event: { currentTarget: React.SetStateAction<null>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    list?.goods?.length > 0 ? (
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
    ) : null
  );
}
