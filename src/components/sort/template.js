const createSortItemsTemplate = (sortKindsInfo) => {
  return sortKindsInfo
    .map((oneSortKind) => {
      return (`
        <li>
          <a href="#" class="sort__button ${oneSortKind.activeClass}">
            ${oneSortKind.sortKindStr}
          </a>
        </li>
      `);
    })
    .join(``);
};

export const createSortTemplate = (sortKindsInfo) => {
  return (`
    <ul class="sort">
      ${createSortItemsTemplate(sortKindsInfo)}
    </ul>
  `);
};
