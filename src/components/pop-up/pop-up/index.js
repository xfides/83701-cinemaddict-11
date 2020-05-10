import AbstractComponent from '../../abstract-component';
import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block';
import {CssClass, KeyCode, Emoji, Animation} from '../../../consts';

export default class PopUpComponent extends AbstractComponent {

  constructor() {
    super();
    this._popUpFilm = null;
    this._popUpChangeHandler = null;
    this._popUpCategoryUpdateHandler = null;
    this._popUpClickHandler = this._popUpClickHandler.bind(this);
    this._popUpKeyDownHandler = this._popUpKeyDownHandler.bind(this);
  }

  getTemplate() {
    const templates = {
      filmFullInfo: createFilmFullInfoComponent(this._popUpFilm),
      commentsBlock: this._popUpFilm
        ? createCommentsBlockComponent(this._popUpFilm.comments)
        : ``,
      filmFullInfoControl: this._popUpFilm
        ? createFilmFullInfoControlTemplate(this._popUpFilm)
        : ``
    };

    return createPopUpTemplate(templates, this._popUpFilm.id);
  }

  getDomElement() {
    super.getDomElement();

    this._domElement.addEventListener(`click`, this._popUpClickHandler);
    document.addEventListener(`keydown`, this._popUpKeyDownHandler);

    return this._domElement;
  }

  executeAfterRemove() {
    document.removeEventListener(`keydown`, this._popUpKeyDownHandler);
  }

  setPopUpInfo(popUpInfo) {
    this._popUpFilm = popUpInfo.popUpFilm;
    this._popUpChangeHandler = popUpInfo.popUpChangeHandler;
    this._popUpCategoryUpdateHandler = popUpInfo.popUpCategoryUpdateHandler;
    this._commentDeleteHandler = popUpInfo.commentDeleteHandler;
    return this;
  }

  _popUpClickHandler(evt) {
    this._closePopUpClickHandler(evt);
    this._popUpControlsClickHandler(evt);
    this._selectEmojiClickHandler(evt);
    this._commentDeleteClickHandler(evt);
  }


  // --= CLOSE POPUP =--

  _closePopUpClickHandler(evt) {
    const closePopUpDom =
      evt.target.classList.contains(`${CssClass.POPUP_CLOSE}`);

    if (closePopUpDom) {
      this._popUpChangeHandler(null);
    }
  }

  _popUpKeyDownHandler(evt) {
    if (evt.type === `keydown` && evt.keyCode === KeyCode.ESC) {
      this._popUpChangeHandler(null);
    }
  }


  // --= SPECIAL RERENDER =--

  reRender() {
    const tempDataForReRender = this._saveTempDataForReRender();
    const oldDomElement = this.getDomElement();
    const parentOldDomElement = oldDomElement.parentElement;
    this._domElement = null;
    const newDomElement = this.getDomElement();

    if (
      parentOldDomElement
      && oldDomElement
      && newDomElement
    ) {
      parentOldDomElement.replaceChild(newDomElement, oldDomElement);
      this._restoreTempDataAfterReRender(tempDataForReRender);
    }
  }

  _saveTempDataForReRender() {
    const tempDataForReRender = {
      popUpYOffset: this._domElement.scrollTop,
      popUpXOffset: this._domElement.scrollLeft,
      pageYOffset: window.pageYOffset,
      pageXOffset: window.pageXOffset,
      checkedEmojiInputId: undefined,
      commentText: this._domElement
        .querySelector(`.${CssClass.FILM_DETAILS_COMMENT_INPUT}`).value,
      labelEmojiImg: this._domElement
        .querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
        .innerHTML
        .trim()
    };

    const emojiRadioInputsDom = this._domElement
      .querySelectorAll(`.${CssClass.FILM_DETAILS_EMOJI_ITEM}`);
    const checkedRadioInputDom = [...emojiRadioInputsDom].find((radioInput) => {
      return radioInput.checked
    });

    if (checkedRadioInputDom) {
      tempDataForReRender.checkedEmojiInputId = checkedRadioInputDom.id;
    }

    return tempDataForReRender;
  }

  _restoreTempDataAfterReRender(tempDataForReRender) {
    window.scroll(
      tempDataForReRender.pageXOffset,
      tempDataForReRender.pageYOffset
    );

    this._domElement.scrollTop = tempDataForReRender.popUpYOffset;
    this._domElement.scrollLeft = tempDataForReRender.popUpXOffset;
    this._domElement
      .querySelector(`.${CssClass.FILM_DETAILS_COMMENT_INPUT}`)
      .value = tempDataForReRender.commentText;
    this._domElement
      .querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
      .innerHTML = tempDataForReRender.labelEmojiImg;

    if (tempDataForReRender.checkedEmojiInputId) {
      this._domElement
        .querySelector(`#${tempDataForReRender.checkedEmojiInputId}`)
        .checked = true;
    }

  }


  // --= DELETE COMMENT =--

  _commentDeleteClickHandler(evt) {
    if (
      evt.target.classList.contains(`${CssClass.FILM_DETAILS_COMMENT_DELETE}`)
    ) {
      evt.preventDefault();

      const filmId = evt.target.closest(`.${CssClass.FILM_DETAILS}`).dataset.id;
      const commentId =
        evt.target.closest(`.${CssClass.FILM_DETAILS_COMMENT}`).dataset.id;

      this._commentDeleteHandler(filmId, commentId);
    }
  }

  markStartingOfDeletingComment(commentId) {
  }

  markCancelingOfDeletingComment(commentId) {
  }


  // --= CLICKING ON EMOJI =--

  _selectEmojiClickHandler(evt) {
    const emojiLabelDom = evt.target
      .closest(`.${CssClass.FILM_DETAILS_EMOJI_LABEL}`);

    if (emojiLabelDom) {
      const selectedEmotion = emojiLabelDom.htmlFor.split(`-`)[1];

      this._domElement
        .querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
        .innerHTML = this._createEmojiLabelAdd(selectedEmotion);
    }
  }

  _createEmojiLabelAdd(emoji) {
    return (`
      <img 
        src="${Emoji.RELATIVE_PATH}${Emoji.Images[emoji.toUpperCase()]}" 
        width="55" 
        height="55" 
        alt="emoji-${emoji}"/>
    `)
  }


  // --= CHANGING FILM CATEGORY =--

  _popUpControlsClickHandler(evt) {
    const label = evt.target;
    const labelParent = label.parentElement;

    if (
      label.classList.contains(CssClass.FILM_DETAILS_CONTROL)
      && labelParent.querySelector(`#${label.htmlFor}`)
      && !labelParent.querySelector(`#${label.htmlFor}`).disabled
    ) {
      evt.preventDefault();

      const labelClasses = [
        CssClass.FILM_DETAILS_CONTROL_SCHEDULED,
        CssClass.FILM_DETAILS_CONTROL_FAVORITE,
        CssClass.FILM_DETAILS_CONTROL_WATCHED
      ];
      const checkedClass = labelClasses.find((buttonClass) => {
        return label.classList.contains(buttonClass);
      });
      const filmId = label.closest(`.${CssClass.FILM_DETAILS}`).dataset.id;

      this._popUpCategoryUpdateHandler({checkedClass, filmId});
    }
  }

  showRejectingOfChangingCategory(classCategory) {
    const classListOfCategory = this._domElement
      .querySelector(`.${classCategory}`)
      .classList;

    classListOfCategory.add(CssClass.ANIMATE_HEADSHAKE);

    setTimeout(
      () => {
        classListOfCategory.remove(CssClass.ANIMATE_HEADSHAKE)
      },
      Animation.HEADSHAKE.duration
    );
  }


  // --= ADDING NEW COMMENT =---

  _commentFormSendHandler() {
  }

  markStartingOfAddingNewComment() {
  }

  markCancelingOfAddingNewComment() {
  }

}
