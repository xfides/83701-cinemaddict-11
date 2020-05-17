export const createTimeControlsTemplate = (templatesOfTimeControlsItems) => {
  return (`
    <form 
      action="https://echo.htmlacademy.ru/" 
      method="get" 
      class="statistic__filters">
      
      <p class="statistic__filters-description">
        Show stats:
      </p>

      ${templatesOfTimeControlsItems}      
    </form>
  `);
};

