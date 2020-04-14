import {ScreenMsgs, Emojis} from '../../consts/index.js';

const handleZeroComments = (countComments) => {
  return countComments === 0 ? (
    {
      emojiTemplateImg: `
          <img src="${Emojis.RELATIVE_PATH}${Emojis.DEFAULT_IMG_COMMENT_ZERO}" 
               width="55" 
               height="55" 
               alt="emoji-smile">`,
      textNewComment: ScreenMsgs.STUB_ADD_COMMENT_ZERO
    }
  ) : (
    {
      emojiTemplateImg: ``,
      textNewComment: ``
    }
  );
};

export const templateCommentAddNew = (templateEmojis, countComments) => {

  const defaultData = handleZeroComments(countComments);

  return `
    <div class="film-details__new-comment">
      <div for="add-emoji" 
           class="film-details__add-emoji-label">
           ${defaultData.emojiTemplateImg}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" 
                  placeholder="Select reaction below and write comment here" 
                  name="comment">${defaultData.textNewComment}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${templateEmojis}
      </div>
    </div>
  `;
};
