import React from "react";
import { useEffect, useRef } from "react";
import { Item } from "./MenuItem.tsx";
import { ShoppingListView } from "./ShoppingList";

interface ItemsProps {
  list:ShoppingListView
  handleDeleteItem: (list: ShoppingListView, item: string) => void
  editCategory: (id: string, item: ShoppingListView) => void
  findListHeight: React.Dispatch<React.SetStateAction<number>>
}

export const Items = ({
  list,
  handleDeleteItem,
  editCategory,
  findListHeight,
}: ItemsProps) => {
    
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current && findListHeight(listRef.current.clientHeight)
    
  }, [list]);

  return (
    <div ref={listRef}>
      {list.goods?.map((good, index) => {
        return (
          <div key={good.id}>
            <Item
              good={good}
              list={list}
              handleDeleteItem={handleDeleteItem}
              editCategory={editCategory}
              findListHeight={findListHeight}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
};
