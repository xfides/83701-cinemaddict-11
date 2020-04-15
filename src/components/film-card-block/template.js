export const createFilmCardBlockTemplate = (filmBlock) => {
  return (`
    <section class="${filmBlock.classExtraBlock}">
      <h2 class="films-list__title ${filmBlock.classHiddenTitle}">
        ${filmBlock.titleText}
      </h2>
      <div class="films-list__container">
        ${filmBlock.templateFilmCards}
      </div>
      ${filmBlock.templateShowMoreBlock}
    </section>
  `);
};
