import {createTimeControlItem} from '../time-controls-item';
import {StatisticsTime} from '../../../../consts';
import {createTimeControlsTemplate} from './template.js';

const getTimeItemInfo = (oneItem, timeFilter) => {
  return {
    id: `statistics-${oneItem.toLowerCase().split(` `).join(`-`)}`,
    label: oneItem,
    checked: oneItem === timeFilter
  }
};

export const createTimeControlsComponent = (timeFilter) => {
  const templatesOfTimeControlsItems = Object.values(StatisticsTime)
    .map((oneTimeItem) => {
      return createTimeControlItem(getTimeItemInfo(oneTimeItem, timeFilter));
    })
    .join(``);

  return createTimeControlsTemplate(templatesOfTimeControlsItems);
};
