export const templateCommentsBlock = (commentsBlockData) => {
  return (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments 
        <span class="film-details__comments-count">
          ${commentsBlockData.countComments}
        </span>
      </h3>
      <ul class="film-details__comments-list">
        ${commentsBlockData.templateComments}
      </ul>
      ${commentsBlockData.templateCommentAddNew}
    </section>
  `);
};
