import {commentAddEmoji} from '../comment-add-emoji/index.js';
import {templateCommentAddNew} from './template.js';
import {Emoji} from '../../consts/index.js';

export const commentAddNew = (countComments) => {
  const commentAddNewData = {
    templateEmojis: Emoji.IMAGES.map(commentAddEmoji).join(``),
    countComments
  };

  return templateCommentAddNew(commentAddNewData);
};
