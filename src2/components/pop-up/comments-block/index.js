import {createCommentsBlockTemplate} from './template.js';
import {createCommentAddNewComponent} from '../comment-add-new/index.js';
import {createCommentComponent} from '../comment/index.js';

export const createCommentsBlockComponent = (comments) => {
  const commentsBlockData = {
    templateComments: comments.map(createCommentComponent).join(``),
    templateCommentAddNew: createCommentAddNewComponent(comments.length),
    countComments: comments.length
  };

  return createCommentsBlockTemplate(commentsBlockData);
};
