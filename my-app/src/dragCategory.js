
import { ButtonCategory } from "./BasicMenu"
import { useDrag, useDrop,  DragPreviewImage } from 'react-dnd'
import { ItemTypes } from "./React DnD/dragTypes"
import Cart from "./cart.png"

const CartImg = Cart;
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
        const xPozition = pozition?.x < 200;
         if (xPozition) {
          deleteCategory(droppedId)}; 
       if (!didDrop && !xPozition) {
          moveCategory(droppedId, originalIndex)
        }
      },
    }),
    [list.categoryId, originalIndex, moveCategory],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CATEGORY,
     
      hover({ id: draggedId }) {
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
style={{opacity: isDragging ? 1:  0.7, cursor: isDragging ? 'move' : 'crosshair' }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        ref={(node) => drag(drop(node))}
       >
        {`${list.category} (${list.goods.length})`}
      </ButtonCategory>
      


)}