import AbstractComponent from '../abstract-component/index.js';
import {createNavItemTemplate} from '../nav-item/index.js';
import {createNavTemplate} from './template.js';
import {FilmFilter, CssClass, FilmSection} from '../../consts/index.js';
import {
  filterFilmsByField,
  ensureArray,
  createDomElement
} from '../../utils/common.js';

export default class NavComponent extends AbstractComponent {
  constructor(controlData) {
    super();
    this._controlData = controlData;
    this._domElement = null;
    this.handleClick = this.handleClick.bind(this);
  }

  getTemplate() {
    let films = this._controlData.getFilms();
    films = ensureArray(films);

    let activeCategory = this._controlData.getCurCategory();

    const categoriesTemplate = Object.values(FilmFilter)
      .map((oneCategory) => {
        return createNavItemTemplate({
          name: oneCategory,
          id: oneCategory.toLowerCase().split(` `)[0],
          count: filterFilmsByField(films, oneCategory).length,
          activeClass: activeCategory === oneCategory
            ? CssClass.NAV_CATEGORY_ACTIVE
            : ``,
          showCountFilms: oneCategory !== FilmFilter.ALL
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
    let attrHrefDom = evt.target.getAttribute(`href`);
    if (!attrHrefDom) {
      return;
    }

    const categoriesAll = Object.values(FilmFilter);
    const categoryChecked = categoriesAll.find((oneCategory) => {
      return attrHrefDom.slice(1) === oneCategory.split(` `)[0].toLowerCase();
    });

    if (
      !categoryChecked
      || categoryChecked === this._controlData.getCurCategory()
    ) {
      return;
    }

    this._controlData.setCountCommonFilms(FilmSection.COMMON.countFilmsToShow);
    this._controlData.setCurCategory(categoryChecked);
  }
}
