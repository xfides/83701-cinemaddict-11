import EventManager from '../event-manager';
import Model from '../models';
import UserRankComponent from '../components/layout/user-rank';
import FooterStatisticsComponent from '../components/layout/footer-statistics';
import NavComponent from '../components/layout/nav';
import {Event, FilmFilter, DomNode} from '../consts';

export default class LayoutController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [UserRankComponent.name]: new UserRankComponent(),
      [FooterStatisticsComponent.name]: new FooterStatisticsComponent(),
      [NavComponent.name]: new NavComponent(),
    };
    this._layoutUpdateHandler = this._layoutUpdateHandler.bind(this);
    this._categoryChangeHandler = this._categoryChangeHandler.bind(this);
    this._navUpdateHandler = this._navUpdateHandler.bind(this);
  }

  run() {
    this._eventManager.on(
        Event.CHANGE_LOADING_STATUS,
        this._layoutUpdateHandler
    );
    this._eventManager.on(Event.CHANGE_CUR_CATEGORY, this._navUpdateHandler);
    this._eventManager.on(Event.FILM_CHANGE_CATEGORY, this._navUpdateHandler);
  }

  _renderUserRank(filmsWatched) {
    this._components[UserRankComponent.name]
      .setFilmsWatched(filmsWatched)
      .render(DomNode.blockHeader);
  }

  _renderNav(navInfo) {
    this._components[NavComponent.name]
      .setNavInfo(navInfo)
      .render(DomNode.blockMain);
  }

  _renderFooterStatistics(filmsAll) {
    this._components[FooterStatisticsComponent.name]
      .setFilmsAll(filmsAll)
      .render(DomNode.blockFooterStatistics);
  }

  _getFilmsByCategory() {
    return {
      [FilmFilter.ALL]: this._modelInstance.getFilmsAll(),
      [FilmFilter.WATCHED]: this._modelInstance.getFilmsWatched(),
      [FilmFilter.FAVORITE]: this._modelInstance.getFilmsFavorite(),
      [FilmFilter.SCHEDULED]: this._modelInstance.getFilmsScheduled(),
    };
  }

  _layoutUpdateHandler() {
    const films = this._getFilmsByCategory();

    this._navUpdateHandler();
    this._renderUserRank(films[FilmFilter.WATCHED]);
    this._renderFooterStatistics(films[FilmFilter.ALL]);
  }

  _navUpdateHandler() {
    const navInfo = {
      films: this._getFilmsByCategory(),
      curCategory: this._modelInstance.getCurCategory(),
      categoryChangeHandler: this._categoryChangeHandler,
    };

    this._renderNav(navInfo);
  }

  _categoryChangeHandler(newCategory) {
    if (this._modelInstance.getCurCategory() !== newCategory) {
      this._modelInstance.setCurCategory(newCategory);
    }
  }

}
