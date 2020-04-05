import {PosRender} from '../consts/index.js';

export const render = (container, template, place = PosRender.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};
