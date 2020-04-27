import EventManager from '../event-manager';
import Model from '../models';
import UserRankComponent from '../components/user-rank';
import FooterStatisticsComponent from '../components/footer-statistics';
import NavComponent from '../components/nav';
import {LoadingStatus, CssClass, Event, FilmFilter} from '../consts';

export default class LayoutController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._domNodes = {
      blockHeader: document.querySelector(`.${CssClass.HEADER}`),
      blockMain: document.querySelector(`.${CssClass.MAIN}`),
      blockFooterStatistics: document.querySelector(
        `.${CssClass.FOOTER_STATISTICS}`
      )
    };
    this._components = {
      [UserRankComponent.name]: new UserRankComponent(),
      [FooterStatisticsComponent.name]: new FooterStatisticsComponent(),
      [NavComponent.name]: new NavComponent(),
    };
    this.handleLoadingStatus = this.handleLoadingStatus.bind(this);
    this.handlerNavClick = this.handlerNavClick.bind(this);
    this.handlerChangeCategory = this.handlerChangeCategory.bind(this);
  }

  run() {
    this._eventManager.on(Event.CHANGE_LOADING_STATUS, this.handleLoadingStatus);
    this._eventManager.on(Event.CHANGE_CUR_CATEGORY, this.handlerChangeCategory);
    this._modelInstance.setLoadingStatus(LoadingStatus.LOADING);
  }

  handleLoadingStatus() {
    const films = this.getFilmsFromModel();
    const navInfo = {
      curCategory: this._modelInstance.getCurCategory(),
      changeCategoryCB: this.handlerNavClick,
      films
    };

    this.renderUserRank(films[FilmFilter.WATCHED]);
    this.renderNav(navInfo);
    this.renderFooterStatistics(films[FilmFilter.ALL]);
  }

  handlerNavClick(newCategory) {
    const curCategory = this._modelInstance.getCurCategory();

    if (curCategory === newCategory) {
      return;
    }

    this._modelInstance.setCurCategory(newCategory);
  }

  handlerChangeCategory() {
    const navInfo = {
      films: this.getFilmsFromModel(),
      curCategory: this._modelInstance.getCurCategory(),
      changeCategoryCB: this.handlerNavClick,
    };

    this.renderNav(navInfo);
  }

  getFilmsFromModel() {
    return {
      [FilmFilter.ALL]: this._modelInstance.getFilmsAll(),
      [FilmFilter.WATCHED]: this._modelInstance.getFilmsWatched(),
      [FilmFilter.FAVORITE]: this._modelInstance.getFilmsFavorite(),
      [FilmFilter.SCHEDULED]: this._modelInstance.getFilmsScheduled(),
    };
  }

  renderUserRank(filmsWatched) {
    this._components[UserRankComponent.name]
      .setFilmsWatched(filmsWatched)
      .render(this._domNodes.blockHeader);
  }

  renderNav(navInfo) {
    this._components[NavComponent.name]
      .setNavInfo(navInfo)
      .render(this._domNodes.blockMain);
  }

  renderFooterStatistics(filmsAll) {
    this._components[FooterStatisticsComponent.name]
      .setFilmsAll(filmsAll)
      .render(this._domNodes.blockFooterStatistics);
  }

}
