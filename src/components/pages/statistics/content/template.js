export const createStatisticsTemplate = (templatesOfSections = `templatesOfSections`) => {
  return (`
    <section class="statistic">
      ${templatesOfSections.templateTitleRank}
      ${templatesOfSections.templateTimeControls}
    </section>
  `);
};
