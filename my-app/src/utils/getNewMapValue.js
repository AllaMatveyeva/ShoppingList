export const getNewMapValue = (mapObject, mapId, value) => {
    const updatedValue = new Map (mapObject);
    updatedValue.set(mapId, value);
    return updatedValue
  };