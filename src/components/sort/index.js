import {createSortTemplate} from './template.js';
import {createDomElement} from '../../utils/common.js';
import {SortKind, CssClass, FilmSection} from '../../consts/index.js';

export default class SortComponent {

  constructor(controlData) {
    this._controlData = controlData;
    this._domElement = null;
    this.handleClick = this.handleClick.bind(this);
  }

  getTemplate() {
    let activeSortKind = this._controlData.getCurSortKind();

    const sortKinds = Object.keys(SortKind).map((oneSortKind) => {
      return {
        sortKindStr: SortKind[oneSortKind].description,
        activeClass: activeSortKind === SortKind[oneSortKind]
          ? CssClass.SORT_KIND_ACTIVE
          : ``
      }
    });

    return createSortTemplate(sortKinds);
  }

  getDomElement() {
    if (this._domElement) {
      return this._domElement;
    }

    this._domElement = createDomElement(this.getTemplate());
    this._domElement.addEventListener(`click`, this.handleClick);

    return this._domElement;
  }

  handleClick(evt) {
    const linkDomElement = evt.target;
    if (!(linkDomElement instanceof HTMLAnchorElement)) {
      return;
    }

    const linkSortChecked = Object.values(SortKind).find((oneSortStr) => {
      return oneSortStr.description === linkDomElement.textContent.trim();
    });

    if (
      !linkSortChecked
      || linkSortChecked === this._controlData.getCurSortKind()
    ) {
      return;
    }

    this._controlData.setCountCommonFilms(FilmSection.COMMON.countFilmsToShow);
    this._controlData.setCurSortKind(linkSortChecked);
  }

  isRendered() {
    return (
      this._domElement
      && !(this._domElement.parentNode instanceof DocumentFragment)
    );
  }

  removeDomElement() {
    this._domElement = null;
  }

}
