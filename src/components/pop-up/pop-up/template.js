export const createPopUpTemplate = (templates, filmId) => {
  return (`
    <section class="film-details" data-id="${filmId}">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">
              close
            </button>
          </div>  
          ${templates.filmFullInfo}
          ${templates.filmFullInfoControl}
        </div>
        
        <div class="form-details__bottom-container">
          ${templates.commentsBlock}
        </div>
      </form>
    </section>
  `);
};
