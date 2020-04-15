import {createCommentAddEmojiTemplate} from './template.js';
import {Emoji} from '../../consts/index.js';

export const createCommentAddEmojiComponent = (emojiImg) => {
  const emojiData = {
    pathToEmotion: `${Emoji.RELATIVE_PATH}${emojiImg}`,
    name: emojiImg.split(`.`)[0]
  };

  return createCommentAddEmojiTemplate(emojiData);
};
