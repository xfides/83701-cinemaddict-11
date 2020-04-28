import AbstractComponent from '../../abstract-component';
import {createNavItemTemplate} from '../nav-item';
import {createNavTemplate} from './template.js';
import {FilmFilter, CssClass} from '../../../consts';
import {ensureArray} from '../../../utils';

export default class NavComponent extends AbstractComponent {

  constructor() {
    super();
    this._films = {};
    this._curCategory = null;
    this._changeCategoryCB = null;
    this.handleClick = this.handleClick.bind(this);
  }

  setNavInfo(navInfo) {
    this._films = navInfo.films;
    this._curCategory = navInfo.curCategory;
    this._changeCategoryCB = navInfo.changeCategoryCB;
    return this;
  }

  getTemplate() {
    const categoriesTemplate = Object.values(FilmFilter)
      .map((oneCategory) => {
        return createNavItemTemplate({
          name: oneCategory,
          id: oneCategory.toLowerCase().split(` `)[0],
          count: ensureArray(this._films[oneCategory]).length,
          activeClass: this._curCategory === oneCategory
            ? CssClass.NAV_CATEGORY_ACTIVE
            : ``,
          showCountFilms: oneCategory !== FilmFilter.ALL
        });
      })
      .join(``);

    return createNavTemplate(categoriesTemplate);
  }

  getDomElement() {
    super.getDomElement();
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

    if (categoryChecked) {
      this._changeCategoryCB(categoryChecked);
    }
  }

}
