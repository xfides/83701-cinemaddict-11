const getAbilityDeletingComment = (comment) => {
  return comment.awaitConfirmDeletingComment
    ? `<button class="film-details__comment-delete" disabled>
         ...Deleting...
        </button>`
    : `<button class="film-details__comment-delete">Delete</button>`;
};

export const createCommentTemplate = (comment, offlineMode) => {
  return (`
    <li class="film-details__comment" data-id=${comment.id}>
      <span class="film-details__comment-emoji">
        <img 
          src="${comment.pathToEmotion}" 
          width="55" 
          height="55" 
          alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">
          ${comment.text}
        </p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">
            ${comment.author}
          </span>
          <span class="film-details__comment-day">
            ${comment.date}
          </span>
          ${offlineMode ? `` : getAbilityDeletingComment(comment)}
        </p>
      </div>
    </li>
  `);
};
