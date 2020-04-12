export const templateContent = (sections) => {
  return `
    <section class="films">
      ${sections.templateCommon}
      ${sections.templateTopRated}
      ${sections.templateMostCommented}
    </section>
  `;
};
