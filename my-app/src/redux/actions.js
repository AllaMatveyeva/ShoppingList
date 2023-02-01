
export const changeCategory = (value) => ({
  type: "categoryChanged",
  payload: value,
});

export const changeGood = (value) => ({
  type: "goodChanged",
  payload: value,
});

export const addItem = (value) => ({
  type: "itemAdded",
  payload: value,
});

export const deleteGood = () => ({
  type: "goodDeleted",
});

export const deleteCategory = () => ({
  type: "categoryDeleted",
});
