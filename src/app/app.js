
import {inject} from 'aurelia-framework';

import Context from './context';

@inject(Context)
export default class App {

  constructor(context) {
    this.context = context;
  }
}
