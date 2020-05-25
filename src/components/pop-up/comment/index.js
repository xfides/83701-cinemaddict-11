import {createCommentTemplate} from './template.js';
import {formatMsToCommentDate} from '../../../utils';

export const createCommentComponent = (commentInfo, offlineMode) => {
  commentInfo.date = formatMsToCommentDate(commentInfo.date);

  return createCommentTemplate(commentInfo, offlineMode);
};
