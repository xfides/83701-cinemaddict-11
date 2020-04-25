/*
 ---   ---   ---
 Страницы меняются по переходам на ссылки
 У 2 страниц есть общий layout
 Общий layout включает в себя следующие компоненты:
 - UserRank
 - Nav
 - FooterStatistics

 ---   ---   ---
 Особенность компонента UserRank. Он не отображается, если
 у пользователя нет ранга вообще


*/





// import {createUserRankComponent} from '../components/user-rank';
// import NavComponent from '../components/nav';
// import {createFooterStatisticsComponent} from '../components/footer-statistics';


export default class LayoutController {

  constructor() {
    this._state = {
      appStatus: null,
      modelInstance: null
    };

  }

  run(newConfig) {
    console.log(`LayoutController->run()`);
    console.dir(newConfig);
  }

}
