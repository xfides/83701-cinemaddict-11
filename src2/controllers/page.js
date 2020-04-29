import EventManager from '../event-manager';
import Model from '../models';
import ContentComponent from '../components/pages/main/content';
import SortComponent from '../components/pages/main/sort';
import {Event, FilmFilter, DomNode, FilmSection, SortKind} from '../consts';
import {sortFilmsByFieldWithClone} from '../utils';

export default class PageController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [SortComponent.name]: new SortComponent(),
      [ContentComponent.name]: new ContentComponent()
    };
    this.updatePageMain = this.updatePageMain.bind(this);
    this.updateFilms = this.updateFilms.bind(this);
    this.handleNewSortKind = this.handleNewSortKind.bind(this);
    this.increaseCountCommonFilms = this.increaseCountCommonFilms.bind(this);
    this.resetPageMain = this.resetPageMain.bind(this);
    this.changeSortPageMain = this.changeSortPageMain.bind(this);
    this.analyzePopUpIdentifier = this.analyzePopUpIdentifier.bind(this);
  }

  run() {
    this._eventManager.on(Event.CHANGE_LOADING_STATUS, this.updatePageMain);
    this._eventManager.on(Event.CHANGE_COUNT_COMMON_FILMS, this.updateFilms);
    this._eventManager.on(Event.CHANGE_CUR_SORT_KIND, this.changeSortPageMain);
    this._eventManager.on(Event.CHANGE_CUR_CATEGORY, this.resetPageMain);
  }

  updatePageMain() {
    const sortInfo = {
      curSortKind: this._modelInstance.getCurSortKind(),
      changeSortKindCB: this.handleNewSortKind
    };

    this.renderSort(sortInfo);
    this.renderFilms(this.getFilmsInfo());
  }

  updateFilms() {
    this.renderFilms(this.getFilmsInfo());
  }

  makeInterfaceToFilms() {
    return {
      [FilmFilter.ALL]: this._modelInstance.getFilmsAll.bind(
        this._modelInstance
      ),
      [FilmFilter.WATCHED]: this._modelInstance.getFilmsWatched.bind(
        this._modelInstance
      ),
      [FilmFilter.FAVORITE]: this._modelInstance.getFilmsFavorite.bind(
        this._modelInstance
      ),
      [FilmFilter.SCHEDULED]: this._modelInstance.getFilmsScheduled.bind(
        this._modelInstance
      )
    };
  }

  getFilmsInfo() {
    const curSortKind = this._modelInstance.getCurSortKind();
    const curCategory = this._modelInstance.getCurCategory();
    let commonFilms = this.makeInterfaceToFilms()[curCategory]();

    if (curSortKind.associatedFilmField) {
      commonFilms = sortFilmsByFieldWithClone(
        commonFilms,
        curSortKind.associatedFilmField
      );
    }

    return {
      filmsTR: this._modelInstance.getFilmsTopRated(),
      filmsMC: this._modelInstance.getFilmsMostCommented(),
      countCommonFilms: this._modelInstance.getCountCommonFilms(),
      increaseCountCommonFilms: this.increaseCountCommonFilms,
      analyzePopUpIdentifier: this.analyzePopUpIdentifier,
      commonFilms
    };
  }

  increaseCountCommonFilms() {
    const curCountCommonFilms = this._modelInstance.getCountCommonFilms();
    const newCountCommonFilms =
      curCountCommonFilms + FilmSection.COMMON.countFilmsToShow;
    this._modelInstance.setCountCommonFilms(newCountCommonFilms);
  }

  handleNewSortKind(newSortKind) {
    const curSortKind = this._modelInstance.getCurSortKind();

    if (curSortKind !== newSortKind) {
      this._modelInstance.setCurSortKind(newSortKind);
    }
  }

  renderSort(sortInfo) {
    this._components[SortComponent.name]
      .setSortKind(sortInfo)
      .render(DomNode.blockMain);
  }

  renderFilms(filmsInfo) {
    this._components[ContentComponent.name]
      .setFilmsInfo(filmsInfo)
      .render(DomNode.blockMain);
  }

  resetPageMain() {
    this._modelInstance.setCountCommonFilms(
      FilmSection.COMMON.countFilmsToShow
    );

    if (this._modelInstance.getCurSortKind() === SortKind.DEFAULT) {
      this.updateFilms();
      return;
    }

    this._modelInstance.setCurSortKind(SortKind.DEFAULT);
  }

  changeSortPageMain() {
    this._modelInstance.setCountCommonFilms(
      FilmSection.COMMON.countFilmsToShow
    );
    this.updatePageMain();
  }

  analyzePopUpIdentifier(newPopUpIdentifier){
    if(this._modelInstance.getCurPopUpIdentifier() !== newPopUpIdentifier){
      this._modelInstance.setCurPopUpIdentifier(newPopUpIdentifier);
    }
  }

}

