import AbstractComponent from '../../../abstract-component';
import {createSortTemplate} from './template.js';
import {SortKind, CssClass} from '../../../../consts';

export default class SortComponent extends AbstractComponent {

  constructor() {
    super();
    this._curSortKind = SortKind.DEFAULT;
    this._sortKindChangeHandler = null;
    this._sortKindClickHandler = this._sortKindClickHandler.bind(this);
  }

  getTemplate() {
    const sortKinds = [SortKind.DEFAULT, SortKind.DATE, SortKind.RATE];
    const sortKindsData = sortKinds.map((oneSortKind) => {
      return {
        sortKindStr: oneSortKind.description,
        activeClass: this._curSortKind === oneSortKind
          ? CssClass.SORT_KIND_ACTIVE
          : ``
      };
    });

    return createSortTemplate(sortKindsData);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this._sortKindClickHandler);

    return this._domElement;
  }

  setSortKind(sortInfo) {
    this._curSortKind = sortInfo.curSortKind;
    this._sortKindChangeHandler = sortInfo.sortKindChangeHandler;
    return this;
  }

  _getCheckedLinkSort(evt) {
    const linkDom = evt.target;
    if (!(linkDom instanceof HTMLAnchorElement)) {
      return undefined;
    }

    return Object.values(SortKind).find((oneSortStr) => {
      return oneSortStr.description === linkDom.textContent.trim();
    });
  }

  _sortKindClickHandler(evt) {
    const linkSortChecked = this._getCheckedLinkSort(evt);

    if (linkSortChecked) {
      this._sortKindChangeHandler(linkSortChecked);
    }
  }

}
