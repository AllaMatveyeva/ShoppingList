import { ShoppingListView } from "../ShoppingList";

export const getJsonValue = (value:string): Array <ShoppingListView> => JSON.parse(localStorage.getItem(value) || "");
