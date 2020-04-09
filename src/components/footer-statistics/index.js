import {templateFooterStatistics} from './template.js';
import {fakeCountFilmsInDB} from '../../utils/fakeData.js';

const countFilmsInDBFormatted =
  new Intl.NumberFormat(`ru`).format(fakeCountFilmsInDB);

export const footerStatistics = templateFooterStatistics({
  countFilmsInDBFormatted
});
