import AbstractComponent from '../../../abstract-component';
import {createStatisticsTemplate} from './template.js';

export default class StatisticsComponent extends AbstractComponent{

  getTemplate(){
    return createStatisticsTemplate();
  }

}
