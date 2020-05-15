import EventManager from '../event-manager';
import Model from '../models';
import ContentComponent from '../components/pages/main/content';
import SortComponent from '../components/pages/main/sort';
import {
  Event,
  FilmFilter,
  DomNode,
  FilmSection,
  SortKind,
  CssClass,
  AppPage
} from '../consts';
import {sortFilmsByFieldWithClone} from '../utils';

export default class PageController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [SortComponent.name]: new SortComponent(),
      [ContentComponent.name]: new ContentComponent()
    };
    this._interfaceToFilmsByCategory = {
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
    this._sortKindChangeHandler = this._sortKindChangeHandler.bind(this);
    this._countCommonFilmsToShowChangeHandler =
      this._countCommonFilmsToShowChangeHandler.bind(this);
    this._popUpOpenHandler = this._popUpOpenHandler.bind(this);
    this._filmCategoryUpdateHandler = this._filmCategoryUpdateHandler.bind(this);
  }

  run() {
    this._eventManager.on(
      Event.CHANGE_LOADING_STATUS,
      this._decorateCheckAppPage(this._pageMainUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.CHANGE_COUNT_COMMON_FILMS,
      this._decorateCheckAppPage(this._filmsUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.CHANGE_CUR_SORT_KIND,
      this._decorateCheckAppPage(this._pageMainUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_START,
      this._decorateCheckAppPage(this._filmsUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_DONE,
      this._decorateCheckAppPage(this._filmsUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.FILM_DELETE_COMMENT_DONE,
      this._decorateCheckAppPage(this._filmsUpdateHandler).bind(this)
    );
    this._eventManager.on(
      Event.CHANGE_PAGE,
      this._decorateCheckAppPage(this._pageMainUpdateHandler).bind(this),
      {setSortKindToDefault: true}
    );
    this._eventManager.on(
      Event.CHANGE_CUR_CATEGORY,
      this._decorateCheckAppPage(this._pageMainUpdateHandler).bind(this),
      {setSortKindToDefault: true}
    );
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

  _getFilmsInfo() {
    return {
      filmsTR: this._modelInstance.getFilmsTopRated(),
      filmsMC: this._modelInstance.getFilmsMostCommented(),
      commonFilms: this._getCommonFilms(),
      countCommonFilmsToShow: this._modelInstance.getCountCommonFilmsToShow(),
      countCommonFilmsToShowChangeHandler: this._countCommonFilmsToShowChangeHandler,
      popUpOpenHandler: this._popUpOpenHandler,
      filmCategoryUpdateHandler: this._filmCategoryUpdateHandler,
    };
  }

  _getSortInfo() {
    return {
      curSortKind: this._modelInstance.getCurSortKind(),
      sortKindChangeHandler: this._sortKindChangeHandler
    };
  }

  _getCommonFilms() {
    const curCategory = this._modelInstance.getCurCategory();
    const curSortKind = this._modelInstance.getCurSortKind();
    let commonFilms = this._interfaceToFilmsByCategory[curCategory]();

    if (curSortKind.associatedFilmField) {
      commonFilms = sortFilmsByFieldWithClone(
        commonFilms,
        curSortKind.associatedFilmField
      );
    }

    return commonFilms;
  }

  _decorateCheckAppPage(innerFunc) {
    return (...args) => {
      const curPage = this._modelInstance.getCurPage();

      if (curPage === AppPage.MAIN) {
        innerFunc.apply(this, args);
        return;
      }

      this._components[SortComponent.name].removeDomElement();
      this._components[ContentComponent.name].removeDomElement();
    };
  }

  _pageMainUpdateHandler(evt) {
    this._modelInstance.setCurCountCommonFilmsToShow(
      FilmSection.COMMON.countFilmsToShow
    );

    if (
      evt.attachedData.setSortKindToDefault
      && this._modelInstance.getCurSortKind() !== SortKind.DEFAULT
    ) {
      this._modelInstance.setCurSortKind(SortKind.DEFAULT);
    }

    this.renderSort(this._getSortInfo());
    this.renderFilms(this._getFilmsInfo());
  }

  _filmsUpdateHandler() {
    this.renderFilms(this._getFilmsInfo());
  }

  _countCommonFilmsToShowChangeHandler() {
    const curCountCommonFilmsToShow =
      this._modelInstance.getCountCommonFilmsToShow();
    const newCountCommonFilmsToShow =
      curCountCommonFilmsToShow + FilmSection.COMMON.countFilmsToShow;
    this._modelInstance.setCurCountCommonFilmsToShow(newCountCommonFilmsToShow);
  }

  _sortKindChangeHandler(newSortKind) {
    if (this._modelInstance.getCurSortKind() !== newSortKind) {
      this._modelInstance.setCurSortKind(newSortKind);
    }
  }

  _popUpOpenHandler(checkedFilmId) {
    if (this._modelInstance.getCurPopUpId() !== checkedFilmId) {
      this._modelInstance.setCurPopUpId(checkedFilmId);
    }
  }

  _filmCategoryUpdateHandler(filmId, checkedClass) {
    let checkedCategory;

    switch (checkedClass) {
      case CssClass.FILM_CARD_BUTTON_FAVORITE:
        checkedCategory = FilmFilter.FAVORITE;
        break;
      case CssClass.FILM_CARD_BUTTON_SCHEDULED:
        checkedCategory = FilmFilter.SCHEDULED;
        break;
      case CssClass.FILM_CARD_BUTTON_WATCHED:
        checkedCategory = FilmFilter.WATCHED;
        break;
    }

    this._modelInstance.setCategoryForFilm(filmId, checkedCategory);
  }

}
