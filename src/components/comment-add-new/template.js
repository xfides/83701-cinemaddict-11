import {ScreenMsg, Emoji} from '../../consts/index.js';

const getDefaultEmojiData = () => {
  return {
    emojiTemplateImg: `
      <img 
        src="${Emoji.RELATIVE_PATH}${Emoji.DEFAULT_IMG_COMMENT_ZERO}" 
        width="55" 
        height="55" 
        alt="emoji-smile">
    `,
    textNewComment: ScreenMsg.STUB_ADD_COMMENT_ZERO
  };
};

const getNoEmojiData = () => {
  return {
    emojiTemplateImg: ``,
    textNewComment: ``
  };
};

const handleZeroComments = (countComments) => {
  return countComments === 0 ? getDefaultEmojiData() : getNoEmojiData();
};

export const createCommentAddNewTemplate = (commentAddNewData) => {
  const defaultDataEmoji = handleZeroComments(commentAddNewData.countComments);

  return (`
    <div class="film-details__new-comment">
      <div 
        for="add-emoji" 
        class="film-details__add-emoji-label">
        ${defaultDataEmoji.emojiTemplateImg}
      </div>
      <label class="film-details__comment-label">
        <textarea 
          class="film-details__comment-input" 
          placeholder="Select reaction below and write comment here" 
          name="comment">${defaultDataEmoji.textNewComment}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${commentAddNewData.templateEmojis}
      </div>
    </div>
  `);
};
