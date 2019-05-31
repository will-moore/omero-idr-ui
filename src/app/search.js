
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {activationStrategy} from 'aurelia-router';

import Context from './context';

@inject(Context, Router)
export default class Search {

    searchQuery = {};

    router = null;

    // TODO: Do we need router?
    constructor(context, router) {
      this.context = context;
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
      this.searchQuery = params;
    }

    get filteredStudies() {
      if (this.searchQuery.query) {
        return this.context.studiesModel.filterStudiesByMapQuery(this.searchQuery.query);
      }
    }
}
