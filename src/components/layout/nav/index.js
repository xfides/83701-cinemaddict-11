import AbstractComponent from '../../abstract-component';
import {createNavItemTemplate} from '../nav-item';
import {createNavTemplate} from './template.js';
import {FilmFilter, CssClass, AppPage} from '../../../consts';
import {ensureArray} from '../../../utils';

export default class NavComponent extends AbstractComponent {

  constructor() {
    super();
    this._films = {};
    this._curPage = null;
    this._curCategory = null;
    this._categoryChangeHandler = null;
    this._statisticsTurnOnHandler = null;
    this._navClickHandler = this._navClickHandler.bind(this);
  }

  getTemplate() {
    const isStatisticsPage = this._curPage === AppPage.STATISTICS;
    const categoriesTemplate = Object.values(FilmFilter)
      .map((oneCategory) => {
        return createNavItemTemplate(this._getNavItemInfo(oneCategory));
      })
      .join(``);

    return createNavTemplate(categoriesTemplate, isStatisticsPage);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this._navClickHandler);

    return this._domElement;
  }

  setNavInfo(navInfo) {
    this._films = navInfo.films;
    this._curPage = navInfo.curPage;
    this._curCategory = navInfo.curCategory;
    this._categoryChangeHandler = navInfo.categoryChangeHandler;
    this._statisticsTurnOnHandler = navInfo.statisticsTurnOnHandler;
    return this;
  }

  _getNavItemInfo(category) {
    const activeCategoryClass =
      this._curCategory === category && this._curPage === AppPage.MAIN
        ? CssClass.NAV_CATEGORY_ACTIVE
        : ``;

    return {
      name: category,
      id: category.toLowerCase().split(` `)[0],
      count: ensureArray(this._films[category]).length,
      activeClass: activeCategoryClass,
      showCountFilms: category !== FilmFilter.ALL
    };
  }

  _navClickHandler(evt) {
    let hrefOfDom = evt.target.href || evt.target.parentElement.href;

    if (!hrefOfDom) {
      return;
    }

    if (evt.target.classList.contains(CssClass.NAV_STATISTICS)) {
      this._statisticsTurnOnHandler();
      return;
    }

    const categoriesAll = Object.values(FilmFilter);
    const categoryChecked = categoriesAll.find((oneCategory) => {
      return hrefOfDom.split(`#`)[1] === oneCategory.split(` `)[0].toLowerCase();
    });

    if (categoryChecked) {
      this._categoryChangeHandler(categoryChecked);
    }
  }

}
