import EventManager from '../event-manager';
import Model from '../models';
import PopUpComponent from '../components/pop-up/pop-up';
import {Event, DomNode, CssClass, FilmFilter} from '../consts';
import {cloneObj} from '../utils';

export default class PopUpController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [PopUpComponent.name]: new PopUpComponent()
    };
    this._popUpChangeHandler = this._popUpChangeHandler.bind(this);
    this._popUpUpdateHandler = this._popUpUpdateHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentSendHandler = this._commentSendHandler.bind(this);
    this._popUpFilmCategoryUpdateHandler =
      this._popUpFilmCategoryUpdateHandler.bind(this);
    this._commentAddNewResponseHandler =
      this._commentAddNewResponseHandler.bind(this);
    this._commentDeleteResponseHandler =
      this._commentDeleteResponseHandler.bind(this);
  }

  run() {
    const eventsOfPopUp = [
      Event.CHANGE_POP_UP_IDENTIFIER,
      Event.FILM_CHANGE_CATEGORY_START,
      Event.FILM_CHANGE_CATEGORY_DONE,
      Event.FILM_DELETE_COMMENT_START,
      Event.FILM_ADD_COMMENT_START
    ];

    eventsOfPopUp.forEach((event) => {
      this._eventManager.on(event, this._popUpUpdateHandler);
    });

    this._eventManager.on(
        Event.FILM_ADD_COMMENT_DONE,
        this._commentAddNewResponseHandler
    );

    this._eventManager.on(
        Event.FILM_DELETE_COMMENT_DONE,
        this._commentDeleteResponseHandler
    );
  }

  _renderPopUp(popUpInfo) {
    this._components[PopUpComponent.name]
      .setPopUpInfo(popUpInfo)
      .render(DomNode.BODY);
  }

  _popUpUpdateHandler() {
    const curPopUpId = this._modelInstance.getCurPopUpId();

    if (!curPopUpId && !this._components[PopUpComponent.name].isRendered()) {
      return;
    }

    if (!curPopUpId) {
      this._components[PopUpComponent.name].removeDomElement();

      return;
    }

    const filmById = this._modelInstance.getFilmById(curPopUpId);
    const popUpInfo = this._getPopUpInfo(filmById);

    this._renderPopUp(popUpInfo);
  }

  _getPopUpInfo(film) {
    return {
      popUpFilm: film ? cloneObj(film) : undefined,
      popUpChangeHandler: this._popUpChangeHandler,
      popUpFilmCategoryUpdateHandler: this._popUpFilmCategoryUpdateHandler,
      commentDeleteHandler: this._commentDeleteHandler,
      commentSendHandler: this._commentSendHandler,
    };
  }

  _popUpChangeHandler(newPopUpId) {
    if (this._modelInstance.getCurPopUpId() !== newPopUpId) {
      this._modelInstance.setCurPopUpId(newPopUpId);
    }
  }

  _commentDeleteHandler(filmId, commentId) {
    this._modelInstance.deleteComment(filmId, commentId);
  }

  _commentSendHandler(commentInfo, filmId) {
    this._modelInstance.addNewComment(commentInfo, filmId);
  }

  _commentAddNewResponseHandler(evt) {
    this._popUpUpdateHandler();

    if (evt.triggerData.commentSendSuccess) {
      this._components[PopUpComponent.name].clearCommentFormAddNew();
    } else {
      this._components[PopUpComponent.name].shakeCommentFormAddNew();
    }
  }

  _commentDeleteResponseHandler(evt) {
    this._popUpUpdateHandler();

    if (evt.triggerData.delCommentId) {
      this._components[PopUpComponent.name].shakeComment(
          evt.triggerData.delCommentId
      );
    }
  }

  _popUpFilmCategoryUpdateHandler(filmId, checkedClass) {
    let checkedCategory;

    switch (checkedClass) {
      case CssClass.FILM_DETAILS_CONTROL_FAVORITE:
        checkedCategory = FilmFilter.FAVORITE;
        break;
      case CssClass.FILM_DETAILS_CONTROL_SCHEDULED:
        checkedCategory = FilmFilter.SCHEDULED;
        break;
      case CssClass.FILM_DETAILS_CONTROL_WATCHED:
        checkedCategory = FilmFilter.WATCHED;
        break;
    }

    this._modelInstance.setCategoryForFilm(filmId, checkedCategory);
  }

}
