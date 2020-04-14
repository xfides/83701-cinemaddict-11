import {templateCommentsBlock} from './template.js';
import {commentAddNew} from '../comment-add-new/index.js';
import {comment} from '../comment/index.js';

export const commentsBlock = (comments) => {

  const templateComments = comments
    .map((oneComment) => {
      return comment(oneComment);
    }).join(``);

  return templateCommentsBlock(
      {
        comments: templateComments,
        commentAddNew: commentAddNew(comments.length)
      },
      comments.length
  );
};
