import {commentAddEmoji} from '../comment-add-emoji/index.js';
import {templateCommentAddNew} from './template.js';
import {Emoji} from '../../consts/index.js';

export const commentAddNew = (countComments) => {
  const templateEmojis = Emoji.IMAGES.map(commentAddEmoji).join(``);

  return templateCommentAddNew(templateEmojis, countComments);
};
