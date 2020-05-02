import {createCommentTemplate} from './template.js';
import {formatMsToCommentDate} from '../../../utils';

export const createCommentComponent = (commentInfo) => {
  commentInfo.date = formatMsToCommentDate(commentInfo.date);

  return createCommentTemplate(commentInfo);
};
