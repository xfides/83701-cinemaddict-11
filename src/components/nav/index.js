import {createNavItemTemplate} from '../nav-item/index.js';
import {createNavTemplate} from './template.js';
import {FilmFilter} from '../../consts/index.js';
import {filterFilmsByField} from '../../utils/common.js';
import {createDomElement} from '../../utils/common.js';

export default class NavComponent {

  constructor(controlData) {
    this._controlData = controlData;
    this._domElement = null;
    this.handleClick = this.handleClick.bind(this);
  }

  getTemplate() {
    let films = this._controlData.getFilms();
    films = films ? films : [];

    let activeCategory = this._controlData.getCurCategory();
    activeCategory = activeCategory ? activeCategory : FilmFilter.ALL;

    const categoriesTemplate = Object.values(FilmFilter)
      .map((oneCategory) => {
        return createNavItemTemplate({
          name: oneCategory,
          id: oneCategory.toLowerCase().split(` `)[0],
          count: filterFilmsByField(films, oneCategory).length,
          active: activeCategory === oneCategory
        });
      })
      .join(``);

    return createNavTemplate(categoriesTemplate);
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
    let attrHref = evt.target.getAttribute(`href`);
    if (!attrHref) {
      return;
    }

    const categoriesAll = Object.values(FilmFilter);
    const categoryChecked = categoriesAll.find((oneCategory) => {
      return attrHref.slice(1) === oneCategory.split(` `)[0].toLowerCase();
    });

    if (
      !categoryChecked
      || categoryChecked === this._controlData.getCurCategory()
    ) {
      return;
    }

    this._controlData.setCurCategory(categoryChecked);
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
