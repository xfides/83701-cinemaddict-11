import {templateCommentsBlock} from './template.js';
import {commentAddNew} from '../comment-add-new/index.js';
import {comment as createComment} from '../comment/index.js';

export const commentsBlock = (comments) => {
  const commentsBlockData = {
    templateComments: comments.map(createComment).join(``),
    templateCommentAddNew: commentAddNew(comments.length),
    countComments: comments.length
  };

  return templateCommentsBlock(commentsBlockData);
};
