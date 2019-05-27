
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {activationStrategy} from 'aurelia-router';

@inject(Router)
export default class Search {

    searchKey = 'antibody';

    searchValue = null;

    router = null;

    constructor(router) {
      this.router = router;
    }

    // This is necessary to tell Aurelia router not to reuse 
    // the same view model whenever navigating between pages
    // so that the activate method gets called each time
    determineActivationStrategy() {
      return activationStrategy.replace;
    }

    activate(params, routeConfig) {
      console.log('activate', params);
      // TODO: handle search...
    }

    searchChanged(event) {
      if (event.which === 13) {
        let query = `${this.searchKey}:${this.searchValue}`;
        this.router.navigateToRoute('search', {query},
        );
      }
    }
}
