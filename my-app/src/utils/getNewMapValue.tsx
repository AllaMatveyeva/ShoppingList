export const getNewMapValue = (mapObject: Map<any, any>, mapId: number, value:string):Map<any, any> => {
    const updatedValue = new Map (mapObject);
    updatedValue.set(mapId, value);
    return updatedValue
  };