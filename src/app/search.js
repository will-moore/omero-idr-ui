
import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {activationStrategy} from 'aurelia-router';

import Context from './context';

@inject(Context, Router)
export default class Search {

  searchkey = 'Organism';
  searchvalue = 'foo';

  router = null;

  // TODO: Do we need router?
  constructor(context, router) {
    this.context = context;
    this.router = router;
    // Load thumbnails if not already loaded
    this.context.studiesModel.loadStudiesThumbnails();
  }

  // This is necessary to tell Aurelia router not to reuse
  // the same view model whenever navigating between pages
  // so that the activate method gets called each time
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeConfig) {
    console.log('Search Form params...', params);
    // TODO: handle search...
    if (params.query) {
      this.searchkey = params.query.split(':')[0];
      this.searchvalue = params.query.split(':')[1];
      console.log('...this.searchkey', this.searchkey, 'this.searchvalue', this.searchvalue);
    }
  }

  @computedFrom('searchkey', 'searchvalue', 'context.studiesModel.annotationsLoaded')
  get filteredStudies() {
    // if (this.searchkey && this.searchvalue) {
    let query = `${ this.searchkey }:${ this.searchvalue }`;
    return this.context.studiesModel.filterStudiesByMapQuery(query);
    // }
  }
}
