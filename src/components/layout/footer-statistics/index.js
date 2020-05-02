import AbstractComponent from '../../abstract-component';
import {createFooterStatisticsTemplate} from './template.js';
import {formatNumberWithSpaces, ensureArray} from '../../../utils';

export default class FooterStatisticsComponent extends AbstractComponent {

  constructor() {
    super();
    this._filmsAll = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(
        formatNumberWithSpaces(ensureArray(this._filmsAll).length)
    );
  }

  setFilmsAll(newFilmsAll) {
    this._filmsAll = newFilmsAll;
    return this;
  }

}
