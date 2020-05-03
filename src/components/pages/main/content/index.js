import AbstractComponent from '../../../abstract-component';
import {createContentTemplate} from './template.js';
import {createFilmsBlockComponent} from '../films-block';
import {FilmSection, CssClass} from '../../../../consts';

export default class ContentComponent extends AbstractComponent {

  constructor() {
    super();
    this._commonFilms = null;
    this._countCommonFilms = FilmSection.COMMON.countFilmsToShow;
    this._filmsTR = null;
    this._filmsMC = null;
    this._countCommonFilmsChangeHandler = null;
    this._popUpOpenHandler = null;
    this._contentClickHandler = this._contentClickHandler.bind(this);
  }

  getTemplate() {
    const templatesOfFilmSections = {
      common: createFilmsBlockComponent(
          FilmSection.COMMON, this._commonFilms, this._countCommonFilms
      ),
      topRated: this._filmsTR.length
        ? createFilmsBlockComponent(FilmSection.TOP_RATED, this._filmsTR)
        : ``,
      mostCommented: this._filmsMC.length
        ? createFilmsBlockComponent(FilmSection.MOST_COMMENTED, this._filmsMC)
        : ``
    };

    return createContentTemplate(templatesOfFilmSections);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this._contentClickHandler);

    return this._domElement;
  }

  setFilmsInfo(filmsInfo) {
    this._commonFilms = filmsInfo.commonFilms;
    this._countCommonFilms = filmsInfo.countCommonFilms;
    this._filmsTR = filmsInfo.filmsTR;
    this._filmsMC = filmsInfo.filmsMC;
    this._countCommonFilmsChangeHandler = filmsInfo.countCommonFilmsChangeHandler;
    this._popUpOpenHandler = filmsInfo.popUpOpenHandler;
    return this;
  }

  _contentClickHandler(evt) {
    this._showMoreClickHandler(evt);
    this._filmCardClickHandler(evt);
  }

  _showMoreClickHandler(evt) {
    if (evt.target.classList.contains(CssClass.SHOW_MORE)) {
      this._countCommonFilmsChangeHandler();
    }
  }

  _filmCardClickHandler(evt) {
    if (
      evt.target.classList.contains(CssClass.FILM_CARD_POSTER)
      || evt.target.classList.contains(CssClass.FILM_CARD_TITLE)
      || evt.target.classList.contains(CssClass.FILM_CARD_COMMENTS)
    ) {
      const filmCheckedDom = evt.target.closest(`.${CssClass.FILM_CARD}`);
      const titleOfFilmChecked = filmCheckedDom
        .querySelector(`.${CssClass.FILM_CARD_TITLE}`)
        .textContent
        .trim();

      this._popUpOpenHandler(titleOfFilmChecked);
    }
  }

}
