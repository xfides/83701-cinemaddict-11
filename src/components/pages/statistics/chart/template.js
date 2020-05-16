export const createChart = (templateChart) => {
  return (`
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
      ${templateChart}
    </div>
  `);
};
