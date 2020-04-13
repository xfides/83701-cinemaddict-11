import {templateComment} from './template.js';
import {formatMsToCommentDate} from '../../utils/common.js';

export const comment = (comment) => {
  comment.date = formatMsToCommentDate(comment.date);

  return templateComment(comment);
};
