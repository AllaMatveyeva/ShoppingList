const inishialState = {
    category: "",
    good: [],
    items: []
}

export function changeShoppingList (state=inishialState, action)  {
switch (action.type){
    case "itemAdded":
        return {
            ...state,
            
           
        }
        case "categoryChanged":
        return {
            ...state,
            category: action.payload
            
           
        }
        case "goodChanged":
        return {
            ...state,
            good: action.payload
            
           
        }
        default: return state
}

}