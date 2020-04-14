import {templateFooterStatistics} from './template.js';
import {formatNumberWithSpaces} from '../../utils/common.js';

export const footerStatistics = (films = []) => {
  const countFilmsFormatted = formatNumberWithSpaces(films.length);

  return templateFooterStatistics(countFilmsFormatted);
};
