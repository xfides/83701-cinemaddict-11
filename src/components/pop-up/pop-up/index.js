import AbstractComponent from '../../abstract-component';
import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block';
import {
  CssClass,
  KeyCode,
  Emoji,
  Animation,
  ScreenMsg,
  Error
} from '../../../consts';

export default class PopUpComponent extends AbstractComponent {

  constructor() {
    super();
    this._popUpFilm = null;
    this._popUpChangeHandler = null;
    this._popUpFilmCategoryUpdateHandler = null;
    this._popUpClickHandler = this._popUpClickHandler.bind(this);
    this._popUpKeyDownHandler = this._popUpKeyDownHandler.bind(this);
  }

  getTemplate() {
    const templates = {
      filmFullInfo: createFilmFullInfoComponent(this._popUpFilm),
      commentsBlock: this._popUpFilm
        ? createCommentsBlockComponent(this._popUpFilm)
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
    this._setDefaultsForNewComment();

    return this._domElement;
  }

  executeAfterRemove() {
    document.removeEventListener(`keydown`, this._popUpKeyDownHandler);
  }

  setPopUpInfo(popUpInfo) {
    this._popUpFilm = popUpInfo.popUpFilm;
    this._popUpChangeHandler = popUpInfo.popUpChangeHandler;
    this._popUpFilmCategoryUpdateHandler = popUpInfo.popUpFilmCategoryUpdateHandler;
    this._commentDeleteHandler = popUpInfo.commentDeleteHandler;
    this._commentSendHandler = popUpInfo.commentSendHandler;
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
    if (evt.type === `keydown` && evt.key === KeyCode.ESC) {
      this._popUpChangeHandler(null);
    }
    if (
      evt.type === `keydown`
      && (evt.ctrlKey || evt.metaKey)
      && evt.key === KeyCode.ENTER
      && !this._popUpFilm.awaitConfirmAddingComment
    ) {
      this._commentSendKeyDownHandler();
    }
  }


  // --= SPECIAL RERENDER =--

  reRender() {
    const tempDataForReRender = this._saveTempDataForReRender();
    super.reRender();
    this._restoreTempDataAfterReRender(tempDataForReRender);
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

    const checkedRadioInputDom = this._findCheckedEmojiInputDom();

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

  _setDefaultsForNewComment() {
    if (
      !this._domElement
      || this._popUpFilm.comments.length !== 0
      || this._findCheckedEmojiInputDom()
    ) {
      return undefined;
    }

    const emojiEmotion = Emoji.Images.SMILE.split(`.`)[0];
    const emojiInputsDom = this._domElement
      .querySelectorAll(`.${CssClass.FILM_DETAILS_EMOJI_ITEM}`);
    const emojiToCheckInputDom = [...emojiInputsDom].find((emojiInputDom) => {
      return emojiInputDom.id.split(`-`)[1] === emojiEmotion;
    });

    emojiToCheckInputDom.checked = true;
    this._domElement.querySelector(`.${CssClass.FILM_DETAILS_COMMENT_INPUT}`)
      .value = ScreenMsg.STUB_ADD_COMMENT_ZERO;
    this._domElement.querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
      .innerHTML = this._createEmojiLabelAdd(emojiEmotion);

    return undefined;
  }


  // --= DELETE COMMENT =--

  _commentDeleteClickHandler(evt) {
    if (
      evt.target.classList.contains(`${CssClass.FILM_DETAILS_COMMENT_DELETE}`)
      && !evt.target.disabled
    ) {
      evt.preventDefault();

      const filmId = evt.target.closest(`.${CssClass.FILM_DETAILS}`).dataset.id;
      const commentId =
        evt.target.closest(`.${CssClass.FILM_DETAILS_COMMENT}`).dataset.id;

      this._commentDeleteHandler(filmId, commentId);
    }
  }


  // --= CLICKING ON EMOJI =--

  _selectEmojiClickHandler(evt) {
    if (this._popUpFilm.awaitConfirmAddingComment) {
      evt.preventDefault();
      return undefined;
    }

    const emojiLabelDom = evt.target
      .closest(`.${CssClass.FILM_DETAILS_EMOJI_LABEL}`);

    if (emojiLabelDom) {
      const selectedEmotion = emojiLabelDom.htmlFor.split(`-`)[1];

      this._domElement
        .querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
        .innerHTML = this._createEmojiLabelAdd(selectedEmotion);
    }

    return undefined;
  }

  _createEmojiLabelAdd(emoji) {
    return (`
      <img 
        src="${Emoji.RELATIVE_PATH}${Emoji.Images[emoji.toUpperCase()]}" 
        width="55" 
        height="55" 
        alt="emoji-${emoji}"/>
    `);
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

      this._popUpFilmCategoryUpdateHandler(filmId, checkedClass);
    }
  }


  // --= ADDING NEW COMMENT =---

  _commentSendKeyDownHandler() {
    const commentInputDom = this._domElement
      .querySelector(`.${CssClass.FILM_DETAILS_COMMENT_INPUT}`);
    const checkedEmojiDom = this._findCheckedEmojiInputDom();
    const formData = {
      commentText: commentInputDom.value.trim(),
      checkedEmoji: checkedEmojiDom ? checkedEmojiDom.id.split(`-`)[1] : null
    };

    const errors = this._validateCommentForm(formData);

    if (!errors.length) {
      this._commentSendHandler(formData, this._domElement.dataset.id);
    } else {
      this._showErrorsInCommentForm(errors);
    }
  }

  _validateCommentForm(formData) {
    const errors = [];

    if (!formData.commentText.length) {
      errors.push(Error.FORM_EMPTY_USER_MSG);
    }

    if (!formData.checkedEmoji) {
      errors.push(Error.FORM_NO_CHECKED_EMOJI);
    }

    return errors;
  }

  _findCheckedEmojiInputDom() {
    if (!this._domElement) {
      return undefined;
    }
    const emojiInputsDom = this._domElement
      .querySelectorAll(`.${CssClass.FILM_DETAILS_EMOJI_ITEM}`);

    return [...emojiInputsDom].find((emojiInput) => {
      return emojiInput.checked;
    });
  }

  _showErrorsInCommentForm(errors) {
    errors.forEach((oneError) => {
      switch (oneError) {
        case Error.FORM_EMPTY_USER_MSG:
          this._showSmthWrong(
              `.${CssClass.FILM_DETAILS_COMMENT_INPUT}`,
              Animation.ERROR_IN_FORM
          );
          break;
        case Error.FORM_NO_CHECKED_EMOJI:
          this._showSmthWrong(
              `.${CssClass.FILM_DETAILS_EMOJI_LABEL}`,
              Animation.ERROR_IN_FORM
          );
          break;
      }
    });
  }

  clearCommentFormAddNew() {
    this._domElement.querySelector(`.${CssClass.FILM_DETAILS_COMMENT_INPUT}`)
      .value = ``;

    this._domElement.querySelectorAll(`.${CssClass.FILM_DETAILS_EMOJI_ITEM}`)
      .forEach((emojiInputDom)=>{
        emojiInputDom.checked = false;
      });

    this._domElement.querySelector(`.${CssClass.FILM_DETAILS_EMOJI_LABEL_ADD}`)
      .innerHTML = ``;
  }

  shakeCommentFormAddNew() {
    const formSelector = `.${CssClass.FILM_DETAILS_COMMENT_NEW}`;
    this._showSmthWrong(formSelector, Animation.HEAD_SHAKE);
  }


  // --= SHOW REJECTING OF OPERATION WITH ANIMATION =---

  _showSmthWrong(selector, animationConfig) {
    const elementsCollection = this._domElement.querySelectorAll(selector);
    const elementsDom = [...elementsCollection];

    elementsDom.forEach((elementDom) => {
      elementDom.classList.add(animationConfig.class);
    });

    setTimeout(
        () => {
          elementsDom.forEach((elementDom) => {
            elementDom.classList.remove(animationConfig.class);
          });
        },
        animationConfig.duration
    );
  }


}
