import {createCommentsBlockTemplate} from './template.js';
import {createCommentAddNewComponent} from '../comment-add-new/index.js';
import {createCommentComponent} from '../comment/index.js';

export const createCommentsBlockComponent = (film, offlineMode) => {

  const templateComments = film.comments.map((commentOfFilm) => {
    return createCommentComponent(commentOfFilm, offlineMode)
  })
    .join(``);

  const commentsBlockData = {
    templateCommentAddNew: createCommentAddNewComponent(film, offlineMode),
    countComments: film.comments.length,
    templateComments
  };

  return createCommentsBlockTemplate(commentsBlockData);
};
