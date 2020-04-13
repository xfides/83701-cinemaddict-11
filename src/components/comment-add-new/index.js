import {commentAddEmoji} from '../comment-add-emoji/index.js';
import {templateCommentAddNew} from './template.js';
import {Emojis} from '../../consts/index.js';

export const commentAddNew = (countComments) => {
  const templateEmojis = Emojis.IMGS
    .map((oneEmojiImg) => {
      return commentAddEmoji(oneEmojiImg);
    })
    .join(``);

  return templateCommentAddNew(templateEmojis, countComments);
};
