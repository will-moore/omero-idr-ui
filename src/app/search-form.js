
import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Context from './context';

@inject(Context, Router)
export class SearchFormCustomElement {
  FILTER_KEYS = [{'label': 'Name (IDR number)', 'value': 'Name'},
    'Imaging Method',
    'License', 'Organism',
    'Publication Authors',
    'Publication Title',
    'Screen Technology Type',
    'Screen Type',
    'Study Type']

  @bindable({ defaultBindingMode: bindingMode.twoWay }) searchkey = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) searchvalue = null;

  router = null;

  constructor(context, router) {
    this.context = context;
    this.router = router;
  }

  handleSelectKey(event) {
    let key = event.target.value;
    this.searchkey = key;
  }

  searchChanged(event) {
    if (event.which === 13) {
      let query = `${this.searchkey}:${this.searchvalue}`;
      this.router.navigateToRoute('search', {query},
      );
    }
  }
}
