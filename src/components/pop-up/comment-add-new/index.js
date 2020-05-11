import {createCommentAddEmojiComponent} from '../comment-add-emoji/index.js';
import {createCommentAddNewTemplate} from './template.js';
import {Emoji} from '../../../consts';

export const createCommentAddNewComponent = () => {
  const templatesEmoji = Object.values(Emoji.Images)
    .map(createCommentAddEmojiComponent)
    .join(``);

  return createCommentAddNewTemplate(templatesEmoji);
};
