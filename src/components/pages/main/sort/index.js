import AbstractComponent from '../../../abstract-component';
import {createSortTemplate} from './template.js';
import {SortKind, CssClass} from '../../../../consts';

export default class SortComponent extends AbstractComponent {

  constructor() {
    super();
    this._curSortKind = SortKind.DEFAULT;
    this._changeSortKindCB = null;
    this.handleClick = this.handleClick.bind(this);
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
    this._domElement.addEventListener(`click`, this.handleClick);

    return this._domElement;
  }

  handleClick(evt) {
    const linkDom = evt.target;
    if (!(linkDom instanceof HTMLAnchorElement)) {
      return;
    }

    const linkSortChecked = Object.values(SortKind).find((oneSortStr) => {
      return oneSortStr.description === linkDom.textContent.trim();
    });

    if (linkSortChecked) {
      this._changeSortKindCB(linkSortChecked);
    }
  }

  setSortKind(sortInfo) {
    this._curSortKind = sortInfo.curSortKind;
    this._changeSortKindCB = sortInfo.changeSortKindCB;
    return this;
  }

}
