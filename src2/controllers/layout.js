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
    this.updateLayout = this.updateLayout.bind(this);
    this.handleNewCategory = this.handleNewCategory.bind(this);
    this.updateNav = this.updateNav.bind(this);
  }

  run() {
    this._eventManager.on(Event.CHANGE_LOADING_STATUS, this.updateLayout);
    this._eventManager.on(Event.CHANGE_CUR_CATEGORY, this.updateNav);
  }

  updateLayout() {
    const films = this.getFilmsFromModel();
    const navInfo = {
      curCategory: this._modelInstance.getCurCategory(),
      changeCategoryCB: this.handleNewCategory,
      films
    };

    this.renderUserRank(films[FilmFilter.WATCHED]);
    this.renderNav(navInfo);
    this.renderFooterStatistics(films[FilmFilter.ALL]);
  }

  updateNav() {
    const navInfo = {
      films: this.getFilmsFromModel(),
      curCategory: this._modelInstance.getCurCategory(),
      changeCategoryCB: this.handleNewCategory,
    };

    this.renderNav(navInfo);
  }

  handleNewCategory(newCategory) {
    const curCategory = this._modelInstance.getCurCategory();

    if (curCategory !== newCategory) {
      this._modelInstance.setCurCategory(newCategory);
    }
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
      .render(DomNode.blockHeader);
  }

  renderNav(navInfo) {
    this._components[NavComponent.name]
      .setNavInfo(navInfo)
      .render(DomNode.blockMain);
  }

  renderFooterStatistics(filmsAll) {
    this._components[FooterStatisticsComponent.name]
      .setFilmsAll(filmsAll)
      .render(DomNode.blockFooterStatistics);
  }

}
