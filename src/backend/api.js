import {Backend} from '../consts';
import {checkStatusCode} from '../utils';
import {dataAdapter} from './data-adapter';

export default class API {

  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._headers = new Headers();
    this._headers.set(`Authorization`, authorization);
  }

  getFilms() {
    const pathToResource = `${this._endPoint}${Backend.RESOURCE_MOVIES}`;
    let films;

    return new Promise((res, rej) => {
      this._load(pathToResource)
        .then((response) => {
          return response.json()
        })
        .then((serverFilms) => {
          return this._parseServerFilms(serverFilms);
        })
        .then((clientFilms) => {
          films = clientFilms;
          return this._getAllCommentsToAllFilms(clientFilms);
        })
        .then((allCommentsByFilmId) => {
          const clientFilmsWithComments =
            this._addCommentsToFilms(films, allCommentsByFilmId);

          res(clientFilmsWithComments);
          return clientFilmsWithComments;
        })
        .catch((error) => {
          rej(error);
          console.log(error);
        });
    });
  }

  getCommentsForFittingFilmId(filmId) {
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_COMMENTS}/${filmId}`;

    return new Promise((res, rej) => {
      this._load(pathToResource)
        .then((response) => {
          return response.json()
        })
        .then((serverComments) => {
          const clientComments = this._parseServerComments(serverComments);
          res({filmId, clientComments});
          return clientComments;
        })
        .catch((error) => {
          rej(error);
          console.log(error);
        });
    });
  }

  _getAllCommentsToAllFilms(clientFilms) {
    const clientFilmCommentsPromises = clientFilms.map((oneClientFilm) => {
      return this.getCommentsForFittingFilmId(oneClientFilm.id);
    });

    return Promise.all(clientFilmCommentsPromises);
  }

  _parseServerFilms(serverFilms) {
    return serverFilms.map((oneServerFilm) => {
      return dataAdapter.createClientFilm(oneServerFilm);
    });
  }

  _parseServerComments(serverComments) {
    return serverComments.map((oneServerComment) => {
      return dataAdapter.createClientComment(oneServerComment);
    });
  }

  _addCommentsToFilms(films, allCommentsByFilmId) {
    films.forEach((oneFilm) => {
      const commentsForFilmId = allCommentsByFilmId.find((commentsOneFilm) => {
        return commentsOneFilm.filmId === oneFilm.id;
      });

      oneFilm.comments = commentsForFilmId.clientComments;
    });

    return films;
  }

  deleteComment() {

  }

  _load(pathToResource,
        requestMethod = Backend.REQUEST_METHOD_GET,
        requestHeaders = this._headers,
        requestBody) {

    const serverResponsePromise = fetch(pathToResource, {
      method: requestMethod,
      headers: requestHeaders,
      body: requestBody
    });

    return serverResponsePromise.then(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      },
      (error) => {
        throw error;
      }
    );

  }

}






