import {createCommentsBlockTemplate} from './template.js';
import {createCommentAddNewComponent} from '../comment-add-new/index.js';
import {createCommentComponent} from '../comment/index.js';

export const createCommentsBlockComponent = (film) => {
  const commentsBlockData = {
    templateComments: film.comments.map(createCommentComponent).join(``),
    templateCommentAddNew: createCommentAddNewComponent(film),
    countComments: film.comments.length
  };

  return createCommentsBlockTemplate(commentsBlockData);
};
