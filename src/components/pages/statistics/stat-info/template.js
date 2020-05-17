export const createStatInfoTemplate = (statisticsInfo) => {
  return (`
    <ul class="statistic__text-list">
    
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          You watched
        </h4>
        <p class="statistic__item-text">
          ${statisticsInfo.numberFilms}
          <span class="statistic__item-description">
            movies
          </span>
        </p>
      </li>
      
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          Total duration
        </h4>
        <p class="statistic__item-text">
          ${statisticsInfo.totalDurationHours}
          <span class="statistic__item-description">h</span> 
          ${statisticsInfo.totalDurationMinutes}
          <span class="statistic__item-description">m</span>
        </p>
      </li>
      
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">
          Top genre
        </h4>
        <p class="statistic__item-text">
        ${statisticsInfo.topGenre}
        </p>
      </li>
      
    </ul>
  `);
};

