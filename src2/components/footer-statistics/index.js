import {createFooterStatisticsTemplate} from './template.js';
import {formatNumberWithSpaces, ensureArray} from '../../utils/common.js';

export const createFooterStatisticsComponent = (controlData) => {
  let films = controlData.getFilms();
  films = ensureArray(films);
  const countFilmsFormatted = formatNumberWithSpaces(films.length);

  return createFooterStatisticsTemplate(countFilmsFormatted);
};
