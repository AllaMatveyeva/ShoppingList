import { useEffect, useRef } from "react"
import { Item } from "./MenuItem"

export const Items = ({list, handleDeleteItem, editCategory, findListHeight}) => {
const listRef = useRef();

useEffect(()=>{
    findListHeight(listRef.current.clientHeight)
},[list])

    return (
<div ref={listRef}>
        {list.goods?.map((good,index) => {
          return (
            <div key={good.id}  >
         <Item  good={good} list={list} handleDeleteItem={handleDeleteItem} editCategory={editCategory} findListHeight={findListHeight}/>
         <hr/>
         </div>
        )})}
        </div>
    )
}