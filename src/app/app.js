
import {inject} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

import Context from './context';

@inject(Context)
export default class App {

  router = null;

  constructor(context) {
    this.context = context;
  }

  configureRouter(config, router) {
    router.will = true;
    config.options.pushState = true;
    config.title = 'Studies';
    config.map([
      { route: '',       moduleId: PLATFORM.moduleName('./categories'),   title: 'Categories'},
      { route: 'search', moduleId: PLATFORM.moduleName('./search'), title: 'Search', name: 'search' }
    ]);

    this.router = router;
  }

  doSearch() {
    this.router.navigateToRoute('search', {query:'foo:bar'});
  }
}
