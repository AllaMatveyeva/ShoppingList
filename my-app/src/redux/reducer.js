import { ADD_ITEM, CHANGE_CATEGORY,CHANGE_GOODS,DELETE_CATEGORY,DELETE_GOOD  } from "./actions"

const inishialState = {
    category: "",
    good: [],
    items: []
}

export function changeShoppingList (state=inishialState, action)  {
switch (action.type){
    case ADD_ITEM:
        return {
            ...state,
            items: action.payload
            
           
        }
        case CHANGE_CATEGORY:
        return {
            ...state,
            category: action.payload
            
           
        }
        case CHANGE_GOODS:
        return {
            ...state,
            good: action.payload
            
           
        }
        case DELETE_CATEGORY:
        return {
            ...state,
            items: action.payload
            
           
        }
        case DELETE_GOOD:
            
        return {
            ...state,
            good: action.payload
            
           
        }
        default: return state
}

}