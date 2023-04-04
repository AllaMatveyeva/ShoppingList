import { configureStore } from '@reduxjs/toolkit'
import { changeShoppingList } from './reducer'




export const  getItemMiddleware = (dispatch, getState) => {

};


export const store = configureStore ({
    reducer: {
        shoppingList: changeShoppingList,
    }
})