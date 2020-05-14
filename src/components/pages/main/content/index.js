import AbstractComponent from '../../../abstract-component';
import {createContentTemplate} from './template.js';
import {createFilmsBlockComponent} from '../films-block';
import {FilmSection, CssClass} from '../../../../consts';

export default class ContentComponent extends AbstractComponent {

  constructor() {
    super();
    this._commonFilms = null;
    this._countCommonFilmsToShow = FilmSection.COMMON.countFilmsToShow;
    this._filmsTR = null;
    this._filmsMC = null;
    this._countCommonFilmsToShowChangeHandler = null;
    this._popUpOpenHandler = null;
    this._filmCategoryUpdateHandler = null;
    this._contentClickHandler = this._contentClickHandler.bind(this);
  }

  getTemplate() {
    const hasAllFilmsTRZeroRate = !this._filmsTR.some((oneFilmTR) => {
      return oneFilmTR.rate !== 0;
    });
    const hasAllFilmsMCZeroComments = !this._filmsMC.some((oneFilmMC) => {
      return oneFilmMC.comments.length !== 0;
    });

    const templatesOfFilmSections = {
      common: createFilmsBlockComponent(
        FilmSection.COMMON, this._commonFilms, this._countCommonFilmsToShow
      ),
      topRated: this._filmsTR.length && !hasAllFilmsTRZeroRate
        ? createFilmsBlockComponent(FilmSection.TOP_RATED, this._filmsTR)
        : ``,
      mostCommented: this._filmsMC.length && !hasAllFilmsMCZeroComments
        ? createFilmsBlockComponent(FilmSection.MOST_COMMENTED, this._filmsMC)
        : ``
    };

    return createContentTemplate(templatesOfFilmSections);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this._contentClickHandler);
    this._fixJumpingPosterBug();

    return this._domElement;
  }

  setFilmsInfo(filmsInfo) {
    this._commonFilms = filmsInfo.commonFilms;
    this._countCommonFilmsToShow = filmsInfo.countCommonFilmsToShow;
    this._filmsTR = filmsInfo.filmsTR;
    this._filmsMC = filmsInfo.filmsMC;
    this._countCommonFilmsToShowChangeHandler =
      filmsInfo.countCommonFilmsToShowChangeHandler;
    this._popUpOpenHandler = filmsInfo.popUpOpenHandler;
    this._filmCategoryUpdateHandler = filmsInfo.filmCategoryUpdateHandler;
    return this;
  }

  _fixJumpingPosterBug() {
    const self = this;
    const postersCssSelector = `.${CssClass.FILM_CARD_POSTER}`;
    const posters = this._domElement.querySelectorAll(postersCssSelector);

    const restoreTransDurHandler = () => {
      posters.forEach((onePoster) => {
        onePoster.style.transitionDuration = ``;
      });
      self._domElement.removeEventListener(`mousemove`, restoreTransDurHandler);
    };

    posters.forEach((onePoster) => {
      onePoster.style.transitionDuration = `0s`;
    });

    this._domElement.addEventListener(`mousemove`, restoreTransDurHandler);
  }

  _contentClickHandler(evt) {
    this._showMoreClickHandler(evt);
    this._filmCardClickHandler(evt);
    this._filmCardControlClickHandler(evt);
  }

  _showMoreClickHandler(evt) {
    if (evt.target.classList.contains(CssClass.SHOW_MORE)) {
      this._countCommonFilmsToShowChangeHandler();
    }
  }

  _filmCardClickHandler(evt) {
    if (
      evt.target.classList.contains(CssClass.FILM_CARD_POSTER)
      || evt.target.classList.contains(CssClass.FILM_CARD_TITLE)
      || evt.target.classList.contains(CssClass.FILM_CARD_COMMENTS)
    ) {
      const checkedFilmCardDom = evt.target.closest(`.${CssClass.FILM_CARD}`);
      this._popUpOpenHandler(checkedFilmCardDom.dataset.id);
    }
  }

  _filmCardControlClickHandler(evt) {
    if (evt.target.classList.contains(CssClass.FILM_CARD_BUTTON)) {
      evt.preventDefault();
      const buttonClasses = [
        CssClass.FILM_CARD_BUTTON_SCHEDULED,
        CssClass.FILM_CARD_BUTTON_FAVORITE,
        CssClass.FILM_CARD_BUTTON_WATCHED
      ];
      const checkedClass = buttonClasses.find((buttonClass) => {
        return evt.target.classList.contains(buttonClass);
      });
      const filmId = evt.target.closest(`.${CssClass.FILM_CARD}`).dataset.id;

      this._filmCategoryUpdateHandler(filmId, checkedClass);
    }
  }

}
