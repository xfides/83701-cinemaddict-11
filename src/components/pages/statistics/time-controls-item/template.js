export const createTimeControlItem = (timeItemInfo) =>{
  return(`
    <input 
      type="radio" 
      class="statistic__filters-input visually-hidden" 
      name="statistic-filter" 
      id="${timeItemInfo.id}" 
      value="all-time" 
      ${timeItemInfo.checked ? `checked` : ``}>
    <label 
      for="${timeItemInfo.id}" 
      class="statistic__filters-label">
        ${timeItemInfo.label}
    </label>
  `);
};
