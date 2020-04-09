import {userRank} from './components/user-rank/index.js';
import {nav} from './components/nav/index.js';
import {createTemplateSort} from './components/sort/template.js';
import {createTemplateContent} from './components/content/template.js';
import {footerStatistics} from './components/footer-statistics/index.js';
import {createTemplatePopUp} from './components/pop-up/template.js';
import {render} from './utils/index.js';
import {PosRender} from './consts/index.js';

const init = () => {
  const blockHeader = document.querySelector(`.header`);
  render(blockHeader, userRank);

  const blockMain = document.querySelector(`.main`);
  render(blockMain, nav);
  render(blockMain, createTemplateSort());
  render(blockMain, createTemplateContent());

  const blockStatistics = document.querySelector(`.footer__statistics`);
  render(blockStatistics, footerStatistics);

  const blockScript = document.querySelector(`script`);
  render(blockScript, createTemplatePopUp(), PosRender.BEFORE_BEGIN);
};

init();
