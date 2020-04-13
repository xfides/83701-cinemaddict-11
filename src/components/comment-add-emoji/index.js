import {templateCommentAddEmoji} from './template.js';
import {Emojis} from '../../consts/index.js';

export const commentAddEmoji = (emojiImg) => {
  return templateCommentAddEmoji({
    pathToEmotion: `${Emojis.RELATIVE_PATH}${emojiImg}`,
    name: emojiImg.split(`.`)[0]
  });
};
