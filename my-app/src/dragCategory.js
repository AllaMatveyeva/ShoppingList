
import { ButtonCategory } from "./BasicMenu";
import { useDrag, useDrop,  DragPreviewImage } from 'react-dnd';
import { ItemTypes } from "./React DnD/dragTypes";
import Cart from "./img/cart.png";
import Trash from "./img/trash.png";
import Pencil from "./img/pencil.png";

const pencil = Pencil;
export const trash = Trash;

export function DragCategory ({open, handleClick, list, originalIndex, moveCategory, findCategory, deleteCategory }) {
 
    const [{ isDragging }, drag, preview] = useDrag(() => ({
      item: {id: list.categoryId, originalIndex},
      type: ItemTypes.CATEGORY,
      collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
       const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        const pozition = monitor.getClientOffset();
        const xLeftPozition = pozition?.x < 200;
         if (xLeftPozition) {
          deleteCategory(droppedId)}; 
       if (!didDrop && !xLeftPozition) {
          moveCategory(droppedId, originalIndex)
        }
      },
    }),
    [list.categoryId, originalIndex, moveCategory],
  );

  const [{isDelete}, drop] = useDrop(
    () => ({
      accept: ItemTypes.CATEGORY,
      collect:(monitor)=>({
      isDelete: (monitor.getInitialSourceClientOffset()?.x - monitor.getSourceClientOffset()?.x) > 50,
     }),
      hover({ id: draggedId }, monitor) {
        const start=(monitor.getInitialSourceClientOffset()?.x);
       const offset = (monitor.getSourceClientOffset()?.x);
      const res=((start/(start-offset)));
     
        if (draggedId !== list.categoryId) {
          const { index: overIndex } = findCategory(list.categoryId);
          moveCategory(draggedId, overIndex);
        }
      },
    }),
    [findCategory, moveCategory],
  )


return (
  
<ButtonCategory
style={{opacity: isDragging ? 1:  0.7, position:"relative"}}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        ref={(node) => drag(drop(node))}
       >
        {isDragging && isDelete &&
        <img src={trash} width="30px" height="30px" alt="trash" style={{position: "absolute", top: "50%", left:"10px", transform:"translateY(-50%)"}}></img>
}
        {`${list.category} (${list.goods.length})`}
       
      </ButtonCategory>
      


)}