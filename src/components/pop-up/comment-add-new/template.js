import {CssClass} from '../../../consts';

const getClassForAwaitNewComment = (awaitNewComment) => {
  return awaitNewComment ? CssClass.FILM_DETAILS_COMMENT_LOAD_NEW : ``;
};

export const createCommentAddNewTemplate = (templatesEmoji, awaitNewComment) => {
  return (`
    <div class="film-details__new-comment 
              ${getClassForAwaitNewComment(awaitNewComment)}">
      <div 
        for="add-emoji" 
        class="film-details__add-emoji-label">
      </div>
      <label class="film-details__comment-label">
        <textarea 
          class="film-details__comment-input" 
          placeholder="Select reaction below and write comment here" 
          name="comment"
         ${awaitNewComment ? `disabled` : ``}></textarea>
      </label>
      <div class="film-details__emoji-list">
        ${templatesEmoji}
      </div>
    </div>
  `);
};
