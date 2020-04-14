import {templateCommentAddEmoji} from './template.js';
import {Emoji} from '../../consts/index.js';

export const commentAddEmoji = (emojiImg) => {
  const emojiData = {
    pathToEmotion: `${Emoji.RELATIVE_PATH}${emojiImg}`,
    name: emojiImg.split(`.`)[0]
  };

  return templateCommentAddEmoji(emojiData);
};
