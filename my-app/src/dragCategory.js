
import {Draggable} from 'react-beautiful-dnd';
import { ButtonCategory } from './AdditionStyled';


export function DragCategory ({handleClick, list,  index }) {
 
return (
  <Draggable key={list.categoryId}
  
  index={index}
  draggableId={list?.categoryId}>
    {(provided, snapshot) => (
          <ButtonCategory as="div"
          onClick={handleClick}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            
          >

        {`${list.category} (${list.goods.length})`}
        </ButtonCategory>
     
          
              )}
           </Draggable>
     
      


)}