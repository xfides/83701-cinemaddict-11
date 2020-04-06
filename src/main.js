import {createTemplateUserRank} from './components/user-rank/template.js';
import {createTemplateNav} from './components/nav/template.js';
import {createTemplateSort} from './components/sort/template.js';
import {createTemplateContent} from './components/content/template.js';
import {createTemplateStatistics} from './components/statistics/template.js';
import {createTemplatePopUp} from './components/pop-up/template.js';
import {render} from './utils/index.js';
import {PosRender} from './consts/index.js';


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
