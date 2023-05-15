
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const CHANGE_GOODS = "CHANGE_GOODS";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_GOOD = "DELETE_GOOD";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const changeCategory = (value) => ({
  type: CHANGE_CATEGORY,
  payload: value,
});

export const changeGood = (value) => ({
  type: CHANGE_GOODS,
  payload: value,
});

export const addItem = (value) => ({
  type: ADD_ITEM,
  payload: value,
});

export const deleteGood = () => ({
  type: DELETE_GOOD,
});

export const deleteCategory = () => ({
  type: DELETE_CATEGORY,
});
