export const templateCommentsBlock = (templates, countComments) => {
  return `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments 
        <span class="film-details__comments-count">
          ${countComments}
        </span>
      </h3>
      <ul class="film-details__comments-list">
        ${templates.comments}
      </ul>
      ${templates.commentAddNew}
    </section>
  `;
};
