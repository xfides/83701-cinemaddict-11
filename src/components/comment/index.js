import {createCommentTemplate} from './template.js';
import {formatMsToCommentDate} from '../../utils/common.js';

export const createCommentComponent = (commentInfo) => {
  commentInfo.date = formatMsToCommentDate(commentInfo.date);

  return createCommentTemplate(commentInfo);
};
