export default class Provider {

  constructor(api) {
    this._api = api;
  }

  getFilms() {
    return this._api.getFilms();
  }

  updateFilm(clientFilm) {
    return this._api.updateFilm(clientFilm);
  }

  sendCommentToFilm(newComment, clientFilm) {
    return this._api.sendCommentToFilm(newComment, clientFilm);
  }

  deleteComment(clientComment) {
    return this._api.deleteComment(clientComment);
  }

}
