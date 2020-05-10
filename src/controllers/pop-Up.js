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
    this._popUpCategoryUpdateHandler =
      this._popUpCategoryUpdateHandler.bind(this);
  }

  run() {
    this._eventManager.on(
      Event.CHANGE_POP_UP_IDENTIFIER,
      this._popUpUpdateHandler
    );
    this._eventManager.on(
      Event.FILM_DELETE_COMMENT,
      this._popUpUpdateHandler
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_START,
      this._popUpUpdateHandler
    );
    this._eventManager.on(
      Event.FILM_CHANGE_CATEGORY_DONE,
      this._popUpUpdateHandler
    );
  }

  _renderPopUp(popUpInfo) {
    this._components[PopUpComponent.name]
      .setPopUpInfo(popUpInfo)
      .render(DomNode.body);
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
    const popUpInfo = {
      popUpFilm: filmById ? cloneObj(filmById) : undefined,
      popUpChangeHandler: this._popUpChangeHandler,
      popUpCategoryUpdateHandler: this._popUpCategoryUpdateHandler,
      commentDeleteHandler: this._commentDeleteHandler,
    };

    this._renderPopUp(popUpInfo);
  }

  _popUpChangeHandler(newPopUpId) {
    if (this._modelInstance.getCurPopUpId() !== newPopUpId) {
      this._modelInstance.setCurPopUpId(newPopUpId);
    }
  }

  _commentDeleteHandler(filmId, commentId) {
    const popUpInstance = this._components[PopUpComponent.name];

    popUpInstance.markStartingOfDeletingComment(commentId);

    // async process of deleting comment has 2 endings
    // false Ending - call popUpInstance.markCancelingOfDeletingComment(commentId)
    // true  Ending - call this._modelInstance.deleteFilmComment(filmId, commentId);

    this._modelInstance.deleteFilmComment(filmId, commentId);
  }

  _popUpCategoryUpdateHandler(newInfo) {
    const {checkedClass, filmId} = newInfo;
    const categoryInfo = this._createInfoForChangingFilmCategory(checkedClass);
    this._modelInstance.setCategoryForFilm(newInfo.filmId, categoryInfo);

    // async process of changing Category for film

    setTimeout(() => {
      const film = this._modelInstance.getFilmById(filmId);
      const categoryToChange = categoryInfo.awaitConfirmChangingCategory;

      categoryInfo[categoryToChange] = !film[categoryToChange];
      categoryInfo.awaitConfirmChangingCategory = null;
      this._modelInstance.setCategoryForFilm(filmId, categoryInfo);
    }, 2000);
  }

  _createInfoForChangingFilmCategory(checkedClass) {
    switch (checkedClass) {
      case CssClass.FILM_DETAILS_CONTROL_FAVORITE:
        return {awaitConfirmChangingCategory: FilmFilter.FAVORITE};
      case CssClass.FILM_DETAILS_CONTROL_SCHEDULED:
        return {awaitConfirmChangingCategory: FilmFilter.SCHEDULED};
      case CssClass.FILM_DETAILS_CONTROL_WATCHED:
        return {awaitConfirmChangingCategory: FilmFilter.WATCHED};
    }
  }

}


