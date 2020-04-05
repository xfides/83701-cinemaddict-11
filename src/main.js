import {createTemplateUserRank} from './components/templates/user-rank.js';
import {createTemplateNav} from './components/templates/nav.js';
import {createTemplateSort} from './components/templates/sort.js';
import {createTemplateContent} from './components/templates/content.js';
import {createTemplateStatistics} from './components/templates/statistics.js';
import {createTemplatePopUp} from './components/templates/pop-up.js';

const PosRender = {
  BEFORE_END: `beforeend`,
  BEFORE_BEGIN: `beforebegin`
};

const render = (container, template, place = PosRender.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

const init = () => {
  const blockHeader = document.querySelector(`.header`);
  render(blockHeader, createTemplateUserRank());

  const blockMain = document.querySelector(`.main`);
  render(blockMain, createTemplateNav());
  render(blockMain, createTemplateSort());
  render(blockMain, createTemplateContent());

  const blockStatistics = document.querySelector(`.footer__statistics`);
  render(blockStatistics, createTemplateStatistics());

  const blockScript = document.querySelector(`script`);
  render(blockScript, createTemplatePopUp(), PosRender.BEFORE_BEGIN);
};

init();
