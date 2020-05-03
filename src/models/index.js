import {createFakeFilms} from '../mocks';
import {
  FilmSection,
  FilmFilter,
  SortKind,
  Event,
  LoadingStatus
} from '../consts';
import {ensureArray, sortFilmsByFieldWithClone} from '../utils';
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
    this._popUpIdentifier = null;
    this._curCategory = FilmFilter.ALL;
    this._curSortKind = SortKind.DEFAULT;
    this._page = null;
    this._loadingStatus = null;
    this._handleLoadSuccess = this._handleLoadSuccess.bind(this);
    this._handleLoadError = this._handleLoadError.bind(this);
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

  getCurPopUpIdentifier() {
    return this._popUpIdentifier;
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

  setCurPopUpIdentifier(newPopUpIdentifier) {
    if (this._popUpIdentifier === newPopUpIdentifier) {
      return;
    }

    this._popUpIdentifier = newPopUpIdentifier;

    this._eventManager.trigger(
        Event.CHANGE_POP_UP_IDENTIFIER,
        {[Event.CHANGE_POP_UP_IDENTIFIER]: newPopUpIdentifier}
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


