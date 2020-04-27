import {createFakeFilms} from '../mocks';
import {
  FilmSection,
  FilmFilter,
  SortKind,
  Event,
  LoadingStatus
} from '../consts';
import {filterFilmsByField, ensureArray} from '../utils';
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
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadError = this.handleLoadError.bind(this);
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

  getLoadingStatus() {
    return this._loadingStatus;
  }

  setLoadingStatus(newLoadingStatus) {
    if (this._loadingStatus === newLoadingStatus) {
      return;
    }

    this._loadingStatus = newLoadingStatus;

    this._eventManager.trigger(
      Event.CHANGE_LOADING_STATUS,
      {newLoadingStatus}
    );
  }

  getCurCategory() {
    return this._curCategory;
  }

  setCurCategory(newCategory) {
    if (this._curCategory === newCategory) {
      return;
    }

    this._curCategory = newCategory;

    this._eventManager.trigger(
      Event.CHANGE_CUR_CATEGORY,
      {newCategory}
    );
  }

  loadData() {
    const promiseData = Promise.resolve(createFakeFilms());
    promiseData.then(this.handleLoadSuccess, this.handleLoadError);
  }

  handleLoadSuccess(films) {
    this._films = films ? films : [];
    this.setLoadingStatus(LoadingStatus.LOADING_SUCCESS_FULL);
  }

  handleLoadError() {
    this.setLoadingStatus(LoadingStatus.LOADING_ERROR);
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }


}


