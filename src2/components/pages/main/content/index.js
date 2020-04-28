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
    this._increaseCountCommonFilms = null;
    this.handleClick = this.handleClick.bind(this);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this.handleClick);

    return this._domElement;
  }

  handleClick(evt) {
    this.handleShowMore(evt);
    this.handleOpenPopUp(evt);
  }

  handleShowMore(evt) {
    if (evt.target.classList.contains(CssClass.SHOW_MORE)) {
      this._increaseCountCommonFilms();
    }
  }

  handleOpenPopUp(evt) {
    if (
      evt.target.classList.contains(CssClass.FILM_CARD_POSTER)
      || evt.target.classList.contains(CssClass.FILM_CARD_TITLE)
      || evt.target.classList.contains(CssClass.FILM_CARD_COMMENTS)
    ) {
      const filmCheckedDom = evt.target.closest(`.${CssClass.FILM_CARD}`);

      if (!filmCheckedDom) {
        return;
      }

      const titleOfFilmChecked = filmCheckedDom
        .querySelector(`.${CssClass.FILM_CARD_TITLE}`)
        .textContent
        .trim();

      if (titleOfFilmChecked === this._controlData.getPopUpIdentifier()) {
        return;
      }

      this._controlData.setPopUpIdentifier(
        titleOfFilmChecked ? titleOfFilmChecked : null
      );
    }
  }

  setFilmsInfo(filmsInfo) {
    this._commonFilms = filmsInfo.commonFilms;
    this._countCommonFilms = filmsInfo.countCommonFilms;
    this._filmsTR = filmsInfo.filmsTR;
    this._filmsMC = filmsInfo.filmsMC;
    this._increaseCountCommonFilms = filmsInfo.increaseCountCommonFilms;
    return this;
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

}
