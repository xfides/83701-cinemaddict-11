import {templateComment} from './template.js';
import {formatMsToCommentDate} from '../../utils/common.js';

export const comment = (commentInfo) => {
  commentInfo.date = formatMsToCommentDate(commentInfo.date);

  return templateComment(commentInfo);
};
