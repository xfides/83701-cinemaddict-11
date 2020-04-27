import {createFakeFilms} from '../mocks';
import {
  FilmSection,
  FilmFilter,
  SortKind,
  Event,
  LoadingStatus
} from '../consts';
import {filterFilmsByField, ensureArray} from '../utils';
import {eventManager} from '../event-manager';

export default class Model {

  constructor() {
    this._films = null;
    this._countCommonFilms = FilmSection.COMMON.countFilmsToShow;
    this._popUpIdentifier = null;
    this._curCategory = FilmFilter.ALL;
    this._curSortKind = SortKind.DEFAULT;
    this.page = null;
    this.loadingStatus = null;
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
      return oneFilm[FilmFilter.FilmFilter.SCHEDULED];
    });
  }

  loadData() {
    const promiseData = Promise.resolve(createFakeFilms());
    promiseData.then(this.handleLoadSuccess, this.handleLoadError);
  }

  handleLoadSuccess(films) {
    this._films = films ? films : [];
    eventManager.trigger(
      Event.CHANGE_LOADING_STATUS,
      {newStatus: LoadingStatus.LOADING_SUCCESS_FULL}
    );
  }

  handleLoadError() {
    eventManager.trigger(
      Event.CHANGE_LOADING_STATUS,
      {newStatus: LoadingStatus.LOADING_ERROR}
    );
  }


}
