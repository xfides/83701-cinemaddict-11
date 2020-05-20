import {Backend} from '../consts';
import {dataAdapter} from './data-adapter';

export default class API {

  constructor(endPoint) {
    this._endPoint = endPoint;
    this._headers = new Headers();
    this._headers.append(
        Backend.Headers.BASIC_AUTH[0],
        Backend.Headers.BASIC_AUTH[1]
    );
  }

  getFilms() {
    const pathToResource = `${this._endPoint}${Backend.RESOURCE_MOVIES}`;
    let films;

    return new Promise((res, rej) => {
      this._load(pathToResource)
        .then((response) => {
          return response.json();
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
          throw error;
        });
    });
  }

  updateFilm(clientFilm) {
    const requestMethod = Backend.REQUEST_METHOD_PUT;
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_MOVIES}/${clientFilm.id}`;
    const requestBody =
      JSON.stringify(dataAdapter.createServerFilm(clientFilm));

    if (!this._headers.has(Backend.Headers.CONTENT_TYPE_JSON[0])) {
      this._headers.append(
          Backend.Headers.CONTENT_TYPE_JSON[0],
          Backend.Headers.CONTENT_TYPE_JSON[1]
      );
    }

    return new Promise((res, rej) => {
      this._load(
          pathToResource,
          requestMethod,
          this._headers,
          requestBody
      )
        .then((response) => {
          return response.json();
        })
        .then((serverFilm) => {
          const clientFilmUpdated = dataAdapter.createClientFilm(serverFilm);
          res(clientFilmUpdated);
          return clientFilmUpdated;
        })
        .catch((error) => {
          rej(error);
          throw error;
        });

    });
  }

  _getCommentsForFittingFilmId(filmId) {
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_COMMENTS}/${filmId}`;

    return new Promise((res, rej) => {
      this._load(pathToResource)
        .then((response) => {
          return response.json();
        })
        .then((serverComments) => {
          const clientComments = this._parseServerComments(serverComments);
          res({filmId, clientComments});
          return clientComments;
        })
        .catch((error) => {
          rej(error);
          throw error;
        });
    });
  }

  _getAllCommentsToAllFilms(clientFilms) {
    const clientFilmCommentsPromises = clientFilms.map((oneClientFilm) => {
      return this._getCommentsForFittingFilmId(oneClientFilm.id);
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

    // console.log(pathToResource);
    // console.log(requestMethod);
    // console.log(requestHeaders);
    // console.log(requestBody);
    // console.log(`-----------------------`);

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
    ).catch((error) => {
      throw error;
    });

  }

}


