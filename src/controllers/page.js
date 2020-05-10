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
  CssClass
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
    this._pageMainUpdateHandler = this._pageMainUpdateHandler.bind(this);
    this._filmsUpdateHandler = this._filmsUpdateHandler.bind(this);
    this._sortKindChangeHandler = this._sortKindChangeHandler.bind(this);
    this._countCommonFilmsChangeHandler = this._countCommonFilmsChangeHandler.bind(this);
    this._popUpOpenHandler = this._popUpOpenHandler.bind(this);
    this._filmCategoryUpdateHandler = this._filmCategoryUpdateHandler.bind(this);
  }

  run() {
    this._eventManager.on(
      Event.CHANGE_LOADING_STATUS,
      this._pageMainUpdateHandler
    );
    this._eventManager.on(
      Event.CHANGE_COUNT_COMMON_FILMS,
      this._filmsUpdateHandler
    );
    this._eventManager.on(
      Event.CHANGE_CUR_SORT_KIND,
      this._pageMainUpdateHandler
    );
    this._eventManager.on(
      Event.CHANGE_CUR_CATEGORY,
      this._pageMainUpdateHandler,
      {setSortKindToDefault: true}
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_START,
      this._filmsUpdateHandler
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_DONE,
      this._filmsUpdateHandler
    );
    this._eventManager.on(
      Event.FILM_DELETE_COMMENT,
      this._filmsUpdateHandler
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
      countCommonFilms: this._modelInstance.getCountCommonFilms(),
      countCommonFilmsChangeHandler: this._countCommonFilmsChangeHandler,
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

  _pageMainUpdateHandler(evt) {
    this._modelInstance.setCurCountCommonFilms(
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

  _countCommonFilmsChangeHandler() {
    const curCountCommonFilms = this._modelInstance.getCountCommonFilms();
    const newCountCommonFilms =
      curCountCommonFilms + FilmSection.COMMON.countFilmsToShow;
    this._modelInstance.setCurCountCommonFilms(newCountCommonFilms);
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

  _filmCategoryUpdateHandler(newInfo) {
    const {checkedClass, filmId} = newInfo;
    const categoryInfo = this._createInfoForChangingFilmCategory(checkedClass);

    this._modelInstance.setCategoryForFilm(newInfo.filmId, categoryInfo);

    // async process of changing Category for film

    setTimeout(() => {
      const film = this._modelInstance.getFilmById(filmId);
      const categoryToChange = categoryInfo.awaitConfirmChangingCategory;

      categoryInfo[categoryToChange] = !film[categoryToChange];
      categoryInfo.awaitConfirmChangingCategory = null;
      this._modelInstance.setCategoryForFilm(filmId, categoryInfo);
    }, 2000);
  }

  _createInfoForChangingFilmCategory(checkedClass) {
    switch (checkedClass) {
      case CssClass.FILM_CARD_BUTTON_FAVORITE:
        return {awaitConfirmChangingCategory: FilmFilter.FAVORITE};
      case CssClass.FILM_CARD_BUTTON_SCHEDULED:
        return {awaitConfirmChangingCategory: FilmFilter.SCHEDULED};
      case CssClass.FILM_CARD_BUTTON_WATCHED:
        return {awaitConfirmChangingCategory: FilmFilter.WATCHED};
    }
  }

}

