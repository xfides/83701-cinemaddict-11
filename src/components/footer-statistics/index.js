import {createFooterStatisticsTemplate} from './template.js';
import {formatNumberWithSpaces} from '../../utils/common.js';

export const createFooterStatisticsComponent = (films = []) => {
  const countFilmsFormatted = formatNumberWithSpaces(films.length);

  return createFooterStatisticsTemplate(countFilmsFormatted);
};
