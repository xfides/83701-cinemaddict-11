import {Backend, Event} from '../consts';
import API from '../backend/api.js';
import StoreLS from '../backend/store-LS';
import EventManager from '../event-manager';

const isOnline = () => {
  return window.navigator.onLine;
};

const currentAPI = new API(Backend.END_POINT);
const currentStore =
  new StoreLS(`${Backend.STORE_PREFIX}-${Backend.STORE_VERSION}`);

export default class Provider {

  constructor(api = currentAPI, store = currentStore) {
    this._api = api;
    this._store = store;
    this._eventManager = EventManager.getInstance();
    this.sync = this.sync.bind(this);
    this._documentOnlineHandler()
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((clientFilms) => {
          this._store.set(clientFilms);
          return clientFilms;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }

    return Promise.resolve(this._store.get());
  }

  updateFilm(filmToUpdate) {
    if (isOnline()) {
      return this._api.updateFilm(filmToUpdate)
        .then((clientFilmUpdated) => {
          return this._updateFilmInStore(clientFilmUpdated);
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }

    return Promise.resolve(this._updateFilmInStore(filmToUpdate));
  }

  sendCommentToFilm(newComment, clientFilm) {
    if (isOnline()) {
      return this._api.sendCommentToFilm(newComment, clientFilm)
        .then((newComments) => {
          return this._updateCommentsInStore(newComments, clientFilm);
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }

    clientFilm.comments.push(newComment);
    this._updateCommentsInStore(clientFilm.comments, clientFilm);

    return Promise.resolve(clientFilm.comments);
  }

  deleteComment(commentToDel) {
    if (isOnline()) {
      return this._api.deleteComment(commentToDel)
        .then(() => {
          this._deleteCommentInStore(commentToDel);
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }

    return Promise.resolve(this._deleteCommentInStore(commentToDel));
  }

  sync() {
    const filmsFromStore = this._store.get();

    this._api.sync(filmsFromStore);

  }

  _updateFilmInStore(filmToUpdate) {
    const commentsSaved = filmToUpdate.comments;
    const filmsFromStore = this._store.get();
    const filmToUpdateFromStore = filmsFromStore.find((oneFilmFromStore) => {
      return oneFilmFromStore.id === filmToUpdate.id;
    });

    delete filmToUpdate.comments;
    Object.assign(filmToUpdateFromStore, filmToUpdate);
    this._store.remove();
    this._store.set(filmsFromStore);
    filmToUpdate.comments = commentsSaved;

    return filmToUpdate;
  }

  _updateCommentsInStore(newComments, clientFilm) {
    const filmsFromStore = this._store.get();
    const filmWithComments = filmsFromStore.find((oneFilmFromStore) => {
      return oneFilmFromStore.id === clientFilm.id;
    });
    filmWithComments.comments = newComments;
    this._store.remove();
    this._store.set(filmsFromStore);

    return newComments;
  }

  _deleteCommentInStore(commentToDel) {
    const filmsFromStore = this._store.get();
    let indexOfCommentToDel = -1;

    const filmFromStore = filmsFromStore.find((oneFilmFromStore) => {
      const indexToDel = oneFilmFromStore.comments.findIndex((oneComment) => {
        return oneComment.id === commentToDel.id;
      });

      if (indexToDel > -1) {
        indexOfCommentToDel = indexToDel;
        return true;
      } else {
        return false;
      }
    });

    filmFromStore.comments.splice(indexOfCommentToDel, 1);
    this._store.remove();
    this._store.set(filmsFromStore);
  }

  _documentOnlineHandler() {
    window.addEventListener(`online`, () => {
      document.title = document.title.replace(Backend.OFFLINE_MODE, ``);
      this.sync();
      this._eventManager.trigger(
        Event.OFFLINE_MODE,
        {offline: false}
      );
    });

    window.addEventListener(`offline`, () => {
      document.title += Backend.OFFLINE_MODE;
      this._eventManager.trigger(
        Event.OFFLINE_MODE,
        {offline: true}
      );
    });
  }

}
