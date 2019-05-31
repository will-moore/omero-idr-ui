
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {activationStrategy} from 'aurelia-router';

@inject(Router)
export class SearchFormCustomElement {
  secretMessage = 'Be sure to drink your Ovaltine!';

    searchKey = 'antibody';

    searchValue = null;

    router = null;

    constructor(router) {
      console.log('Search Form constructor');
      this.router = router;
    }

    // This is necessary to tell Aurelia router not to reuse 
    // the same view model whenever navigating between pages
    // so that the activate method gets called each time
    // determineActivationStrategy() {
    //   return activationStrategy.replace;
    // }

    activate(params, routeConfig) {
      console.log('Search Form', params);
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

