import {
  FilmSection,
  FilmFilter,
  SortKind,
  Event,
  LoadingStatus,
  AppPage,
  StatisticsTime,
  Backend,
  ScreenMsg
} from '../consts';
import {
  ensureArray,
  sortFilmsByFieldWithClone,
} from '../utils';
import EventManager from '../event-manager';
import {encode} from 'he';
import faker from 'faker';
import {Emoji} from '../consts';
import API from '../backend/api';

const singletonKey = Symbol();
const singletonVerification = Symbol();

export default class Model {

  constructor(verificationValue) {
    if (verificationValue !== singletonVerification) {
      throw new Error(
          `Please use ${this.constructor.name}.getInstance() to get instance`
      );
    }

    this._api = new API(Backend.END_POINT, Backend.BASIC_AUTH);
    this._eventManager = EventManager.getInstance();
    this._films = null;
    this._countCommonFilmsToShow = FilmSection.COMMON.countFilmsToShow;
    this._popUpId = null;
    this._curCategory = FilmFilter.ALL;
    this._curSortKind = SortKind.DEFAULT;
    this._curStatsTimeFilter = StatisticsTime.ALL_TIME;
    this._page = AppPage.MAIN;
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

  getCountCommonFilmsToShow() {
    return this._countCommonFilmsToShow;
  }

  getCurPopUpId() {
    return this._popUpId;
  }

  getCurPage() {
    return this._page;
  }

  getCurStatsTimeFilter() {
    return this._curStatsTimeFilter;
  }

  setCurStatsTimeFilter(newStatsTimeFilter) {
    if (this._curStatsTimeFilter === newStatsTimeFilter) {
      return;
    }

    this._curStatsTimeFilter = newStatsTimeFilter;
    this._eventManager.trigger(
        Event.CHANGE_STATISTICS_TIME_FILTER,
        {newStatsTimeFilter}
    );
  }

  setCurPage(newPage) {
    if (this._page === newPage) {
      return;
    }

    this._page = newPage;
    this._eventManager.trigger(Event.CHANGE_PAGE, {newPage});
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

  setCurCountCommonFilmsToShow(newCountCommonFilmsToShow) {
    if (this._countCommonFilmsToShow === newCountCommonFilmsToShow) {
      return;
    }

    this._countCommonFilmsToShow = newCountCommonFilmsToShow;

    this._eventManager.trigger(
        Event.CHANGE_COUNT_COMMON_FILMS,
        {[Event.CHANGE_COUNT_COMMON_FILMS]: newCountCommonFilmsToShow}
    );
  }

  setCategoryForFilm(filmId, checkedCategory) {
    this._eventManager.trigger(Event.FILM_CHANGE_CATEGORY_START);

    const filmToChange = this._films.find((film) => {
      return film.id === filmId;
    });
    const tempFilmData = {
      categoryStatus: filmToChange[checkedCategory],
      watchingDate: filmToChange.watchingDate
    };

    filmToChange.awaitConfirmChangingCategory = checkedCategory;
    filmToChange[checkedCategory] = !filmToChange[checkedCategory];

    if (checkedCategory === FilmFilter.WATCHED) {
      if (filmToChange[checkedCategory]) {
        filmToChange.watchingDate = +new Date();
      } else {
        filmToChange.watchingDate = null;
      }
    }

    this._api.updateFilm(filmToChange)
      .then(
          (newClientFilm) => {
            filmToChange.awaitConfirmChangingCategory = null;
            filmToChange[checkedCategory] = newClientFilm[checkedCategory];
            filmToChange.watchingDate = newClientFilm.watchingDate;
            this._eventManager.trigger(
                Event.FILM_CHANGE_CATEGORY_DONE,
                {checkedCategory}
            );
          },
          () => {
            filmToChange[checkedCategory] = tempFilmData.categoryStatus;
            filmToChange.watchingDate = tempFilmData.watchingDate;
            filmToChange.awaitConfirmChangingCategory = null;
            this._eventManager.trigger(
                Event.FILM_CHANGE_CATEGORY_DONE,
                {checkedCategory}
            );
          }
      )
      .catch(
          (error) => {
            throw error;
          }
      );
  }

  deleteComment(filmId, commentId) {
    const film = this.getFilmById(filmId);
    const indexOfComment = this._getIndexOfComment(film, commentId);
    const commentToDel = film.comments[indexOfComment];
    commentToDel.awaitConfirmDeletingComment = true;
    this._eventManager.trigger(Event.FILM_DELETE_COMMENT_START);

    this._api.deleteComment(commentToDel)
      .then(() => {
        const indexOfCommentToDel = this._getIndexOfComment(film, commentId);
        film.comments.splice(indexOfCommentToDel, 1);
        this._eventManager.trigger(
            Event.FILM_DELETE_COMMENT_DONE,
            {delCommentId: null}
        );
      })
      .catch((error) => {
        commentToDel.awaitConfirmDeletingComment = false;
        this._eventManager.trigger(
            Event.FILM_DELETE_COMMENT_DONE,
            {delCommentId: commentId}
        );
        throw error;
      });
  }

  addNewComment(commentInfo, filmId) {
    const film = this.getFilmById(filmId);
    const newComment = this._buildComment(commentInfo);
    film.awaitConfirmAddingComment = true;

    this._eventManager.trigger(Event.FILM_ADD_COMMENT_START);
    this._api.sendCommentToFilm(newComment, film)
      .then(
          (newComments) => {
            film.comments = newComments;
            film.awaitConfirmAddingComment = false;
            this._eventManager.trigger(
                Event.FILM_ADD_COMMENT_DONE,
                {commentSendSuccess: true}
            );
          },
          () => {
            film.awaitConfirmAddingComment = false;
            this._eventManager.trigger(
                Event.FILM_ADD_COMMENT_DONE,
                {commentSendSuccess: false}
            );
          }
      )
      .catch((error) => {
        throw error;
      });
  }

  loadData() {
    const promiseData = Promise.resolve(this._api.getFilms());
    promiseData
      .then(this._handleLoadSuccess, this._handleLoadError)
      .catch((error) => {
        throw error;
      });
  }

  _getIndexOfComment(film, commentId) {
    return film.comments.findIndex((oldComment) => {
      return oldComment.id === commentId;
    });
  }

  _buildComment(commentInfo) {
    const emojiImg = Emoji.Images[commentInfo.checkedEmoji.toUpperCase()];
    return {
      id: faker.random.uuid(),
      text: encode(commentInfo.commentText),
      pathToEmotion: `${Emoji.RELATIVE_PATH}${emojiImg}`,
      author: faker.name.findName(),
      date: +new Date(),
      awaitConfirmDeletingComment: false
    };
  }

  _handleLoadSuccess(films) {
    this._films = ensureArray(films);
    this.setCurLoadingStatus(LoadingStatus.LOADING_SUCCESS_FULL);
  }

  _handleLoadError() {
    this._films = ScreenMsg.FETCH_ABORTED;
    this.setCurLoadingStatus(LoadingStatus.LOADING_ERROR);
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }

}

