export const createStatisticsTemplate = (templatesOfSections = `templatesOfSections`) => {
  return (`
    <section class="statistic">
      ${templatesOfSections.templateTitleRank}
      ${templatesOfSections.templateTimeControls}
      ${templatesOfSections.templateStatInfo}
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>
  `);
};
