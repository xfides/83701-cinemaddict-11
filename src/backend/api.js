import {Backend} from '../consts';
import {dataAdapter} from './data-adapter';

export default class API {

  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getFilms() {
    const pathToResource = `${this._endPoint}${Backend.RESOURCE_MOVIES}`;
    let films;

    return new Promise((res, rej) => {
      this._load({pathToResource})
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
            this._mergeCommentsToFilms(films, allCommentsByFilmId);

          res(clientFilmsWithComments);
          return clientFilmsWithComments;
        })
        .catch((error) => {
          rej(error);
          // throw error;
        });
    });
  }

  updateFilm(clientFilm) {
    const requestMethod = Backend.REQUEST_METHOD_PUT;
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_MOVIES}/${clientFilm.id}`;
    const requestBody =
      JSON.stringify(dataAdapter.createServerFilm(clientFilm));
    const requestHeaders = new Headers({
      [Backend.Headers.CONTENT_TYPE_JSON[0]]: Backend.Headers.CONTENT_TYPE_JSON[1]
    });

    return new Promise((res, rej) => {
      this._load({
        pathToResource,
        requestMethod,
        requestHeaders,
        requestBody
      })
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
          // throw error;
        });
    });
  }

  sendCommentToFilm(newComment, clientFilm) {
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_COMMENTS}/${clientFilm.id}`;
    const requestMethod = Backend.REQUEST_METHOD_POST;
    const requestHeaders = new Headers({
      [Backend.Headers.CONTENT_TYPE_JSON[0]]: Backend.Headers.CONTENT_TYPE_JSON[1]
    });
    const requestBody =
      JSON.stringify(dataAdapter.createServerComment(newComment));

    return new Promise((res, rej) => {
      this._load({
        pathToResource,
        requestMethod,
        requestHeaders,
        requestBody
      })
        .then((response) => {
          return response.json();
        })
        .then((serverFilm) => {
          const clientComments =
            this._parseServerComments(serverFilm.comments);
          res(clientComments);
          return clientComments;
        })
        .catch((error) => {
          rej(error);
          // throw error;
        });
    });
  }

  deleteComment(clientComment) {
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_COMMENTS}/${clientComment.id}`;
    const requestMethod = Backend.REQUEST_METHOD_DELETE;

    return this._load({
      pathToResource,
      requestMethod
    })
      .catch(() => {
        // throw error;
      });
  }

  sync(dataFromStore) {
    const pathToResource = `${this._endPoint}${Backend.RESOURCE_SYNC}`;
    const requestMethod = Backend.REQUEST_METHOD_POST;

    const newDataFromStore = dataFromStore.map((film) => {
      return dataAdapter.createServerFilm(film);
    });

    const requestBody = JSON.stringify(newDataFromStore);
    const requestHeaders = new Headers({
      [Backend.Headers.CONTENT_TYPE_JSON[0]]: Backend.Headers.CONTENT_TYPE_JSON[1]
    });

    return this._load({
      pathToResource,
      requestMethod,
      requestBody,
      requestHeaders
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedServerFilms) => {
        return updatedServerFilms.updated.map(
            (oneUpdatedServerFilm) => {
              return dataAdapter.createClientFilm(oneUpdatedServerFilm);
            }
        );
      })
      .catch(() => {
        // throw error;
      });
  }

  _getCommentsForFittingFilmId(filmId) {
    const pathToResource =
      `${this._endPoint}${Backend.RESOURCE_COMMENTS}/${filmId}`;

    return new Promise((res, rej) => {
      this._load({pathToResource})
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
          // throw error;
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

  _mergeCommentsToFilms(films, allCommentsByFilmId) {
    films.forEach((oneFilm) => {
      const commentsForFilmId = allCommentsByFilmId.find((commentsOneFilm) => {
        return commentsOneFilm.filmId === oneFilm.id;
      });

      oneFilm.comments = commentsForFilmId.clientComments;
    });

    return films;
  }

  _load({
    pathToResource,
    requestMethod = Backend.REQUEST_METHOD_GET,
    requestHeaders = new Headers(),
    requestBody
  }) {
    requestHeaders.append(
        Backend.Headers.BASIC_AUTH[0], Backend.Headers.BASIC_AUTH[1]
    );

    const serverResponsePromise = fetch(pathToResource, {
      method: requestMethod,
      headers: requestHeaders,
      body: requestBody
    });

    return serverResponsePromise.then(
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          }

          throw new Error(`${response.status}: ${response.statusText}`);
        }
    ).catch(() => {
      // throw error;
    });
  }

}


