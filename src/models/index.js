import {createFakeFilms} from '../mocks';
import {
  FilmSection,
  FilmFilter,
  SortKind,
  Event,
  LoadingStatus
} from '../consts';
import {
  ensureArray,
  sortFilmsByFieldWithClone,
  hasSecondObjSameProps
} from '../utils';
import EventManager from '../event-manager';

const singletonKey = Symbol();
const singletonVerification = Symbol();

export default class Model {

  constructor(verificationValue) {
    if (verificationValue !== singletonVerification) {
      throw new Error(
        `Please use ${this.constructor.name}.getInstance() to get instance`
      );
    }

    this._eventManager = EventManager.getInstance();
    this._films = null;
    this._countCommonFilms = FilmSection.COMMON.countFilmsToShow;
    this._popUpId = null;
    this._curCategory = FilmFilter.ALL;
    this._curSortKind = SortKind.DEFAULT;
    this._page = null;
    this._loadingStatus = null;
    this._handleLoadSuccess = this._handleLoadSuccess.bind(this);
    this._handleLoadError = this._handleLoadError.bind(this);
  }

  getFilmById(id) {
    return this._films.find((oneFilm) => {
      return oneFilm.id === id;
    });
  }

  getFilmsAll() {
    return this._films;
  }

  getFilmsWatched() {
    return ensureArray(this._films).filter((oneFilm) => {
      return oneFilm[FilmFilter.WATCHED];
    });
  }

  getFilmsFavorite() {
    return ensureArray(this._films).filter((oneFilm) => {
      return oneFilm[FilmFilter.FAVORITE];
    });
  }

  getFilmsScheduled() {
    return ensureArray(this._films).filter((oneFilm) => {
      return oneFilm[FilmFilter.SCHEDULED];
    });
  }

  getFilmsTopRated() {
    return sortFilmsByFieldWithClone(
      ensureArray(this._films),
      SortKind.RATE.associatedFilmField
    ).slice(0, FilmSection.TOP_RATED.countFilmsToShow);
  }

  getFilmsMostCommented() {
    return sortFilmsByFieldWithClone(
      ensureArray(this._films),
      SortKind.COUNT_COMMENTS.associatedFilmField
    ).slice(0, FilmSection.MOST_COMMENTED.countFilmsToShow);
  }

  getCurCategory() {
    return this._curCategory;
  }

  getCurSortKind() {
    return this._curSortKind;
  }

  getCountCommonFilms() {
    return this._countCommonFilms;
  }

  getCurPopUpId() {
    return this._popUpId;
  }

  setCurLoadingStatus(newLoadingStatus) {
    if (this._loadingStatus === newLoadingStatus) {
      return;
    }

    this._loadingStatus = newLoadingStatus;

    this._eventManager.trigger(
      Event.CHANGE_LOADING_STATUS,
      {[Event.CHANGE_LOADING_STATUS]: newLoadingStatus}
    );
  }

  setCurCategory(newCategory) {
    if (this._curCategory === newCategory) {
      return;
    }

    this._curCategory = newCategory;

    this._eventManager.trigger(
      Event.CHANGE_CUR_CATEGORY,
      {[Event.CHANGE_CUR_CATEGORY]: newCategory}
    );
  }

  setCurSortKind(newSortKind) {
    if (this._curSortKind === newSortKind) {
      return;
    }

    this._curSortKind = newSortKind;

    this._eventManager.trigger(
      Event.CHANGE_CUR_SORT_KIND,
      {[Event.CHANGE_CUR_SORT_KIND]: newSortKind}
    );
  }

  setCurPopUpId(newPopUpId) {
    if (this._popUpId === newPopUpId) {
      return;
    }

    this._popUpId = newPopUpId;

    this._eventManager.trigger(
      Event.CHANGE_POP_UP_IDENTIFIER,
      {[Event.CHANGE_POP_UP_IDENTIFIER]: newPopUpId}
    );
  }

  setCurCountCommonFilms(newCountCommonFilms) {
    if (this._countCommonFilms === newCountCommonFilms) {
      return;
    }

    this._countCommonFilms = newCountCommonFilms;

    this._eventManager.trigger(
      Event.CHANGE_COUNT_COMMON_FILMS,
      {[Event.CHANGE_COUNT_COMMON_FILMS]: newCountCommonFilms}
    );
  }

  setCategoryForFilm(filmId, categoryInfo = {}) {
    const filmToChange = this._films.find((film) => {
      return film.id === filmId;
    });

    if (!filmToChange || hasSecondObjSameProps(filmToChange, categoryInfo)) {
      return undefined;
    }

    if (categoryInfo.awaitConfirmChangingCategory) {
      this._eventManager.trigger(Event.FILM_CHANGE_CATEGORY_START, categoryInfo);
    } else {
      this._eventManager.trigger(Event.FILM_CHANGE_CATEGORY_DONE, categoryInfo);
    }

    Object.assign(filmToChange, categoryInfo);
  }

  deleteFilmComment(filmId, commentId) {
    const film = this.getFilmById(filmId);
    const indexOfCommentToDelete = film.comments.findIndex((oldComment) => {
      return oldComment.id === commentId;
    });

    if (indexOfCommentToDelete !== -1) {
      film.comments.splice(indexOfCommentToDelete, 1);
    }

    this._eventManager.trigger(Event.FILM_DELETE_COMMENT);
  }

  loadData() {
    const promiseData = Promise.resolve(createFakeFilms());
    promiseData.then(this._handleLoadSuccess, this._handleLoadError);
  }

  _handleLoadSuccess(films) {
    this._films = ensureArray(films);
    this.setCurLoadingStatus(LoadingStatus.LOADING_SUCCESS_FULL);
  }

  _handleLoadError() {
    this._films = null;
    this.setCurLoadingStatus(LoadingStatus.LOADING_ERROR);
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }

}


