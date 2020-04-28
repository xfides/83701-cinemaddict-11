import {createCommentAddEmojiComponent} from '../comment-add-emoji/index.js';
import {createCommentAddNewTemplate} from './template.js';
import {Emoji} from '../../consts/index.js';

export const createCommentAddNewComponent = (countComments) => {
  const commentAddNewData = {
    templateEmojis: Emoji.IMAGES.map(createCommentAddEmojiComponent).join(``),
    countComments
  };

  return createCommentAddNewTemplate(commentAddNewData);
};
