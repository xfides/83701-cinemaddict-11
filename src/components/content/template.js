export const createContentTemplate = (templatesOfSections) => {
  return (`
    <section class="films">
      ${templatesOfSections.common}
      ${templatesOfSections.topRated}
      ${templatesOfSections.mostCommented}
    </section>
  `);
};
