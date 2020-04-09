import {PosRender} from '../consts/index.js';

export const render = (container, component, place = PosRender.BEFORE_END) => {
  container.insertAdjacentHTML(place, component);
};

export const createObjectByStructure = (structure, dataFactory) => {
  const structureKeys = Object.getOwnPropertyNames(structure);
  const newObj = {};

  structureKeys.forEach((structureKey) => {
    newObj[structureKey] = dataFactory[structureKey]();
  });

  return newObj;
};

export const truncateStr = (str, newLength, endSymbol)=>{
  return `${str.slice(0, newLength)}${endSymbol}`;
};


