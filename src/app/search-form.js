
import {inject, bindable, bindingMode, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import './search-form.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Context from './context';

@inject(Context, BindingEngine, Router)
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

  results = ['choose key first', 'test', 'Held?'];

  customLabel = item => {return item ? item.label : '';};

  autocompleteObject;  // selected {'label':'Label', 'value':'Value'}

  constructor(context, bindingEngine, router) {
    this.context = context;
    this.bindingEngine = bindingEngine;
    this.router = router;

    console.log('constructor', this.searchkey, this.searchvalue);
  }

  bind() {
    // this.autocomplete.findResults = search => {
    //   console.log('findResults', search);
    //   return Promise.resolve(["aaone", "bbbway", "to", "go", "this"]);
    // };

    // TODO: unbind()
    this.obs1 = this.bindingEngine.propertyObserver(this, 'autocompleteObject').subscribe(
      (newValue, oldValue) => {
        console.log('new', newValue, oldValue);
        if (newValue) {
          this.searchvalue = newValue.value;
          let query = `${this.searchkey}:${this.searchvalue}`;
          this.router.navigateToRoute('search', {query});
        }
      });

    console.log('bind', this.searchkey, this.searchvalue);

    // update auto-complete results
    let vals = this.context.studiesModel.getKeyValueAutoComplete(this.searchkey, '');
    console.log('vals', vals);
    this.results = vals;


    this.obs2 = this.bindingEngine.propertyObserver(this.context.studiesModel, 'annotationsLoaded').subscribe(
      (newValue, oldValue) => {
        console.log('annotationsLoaded', newValue, oldValue);
        let r = this.context.studiesModel.getKeyValueAutoComplete(this.searchkey, '');
        console.log('r', r);
        this.results = r;
      });
  }

  handleSelectKey(event) {
    let key = event.target.value;

    // update auto-complete results
    let vals = this.context.studiesModel.getKeyValueAutoComplete(key, '');
    this.results = vals;

    // reset key:value
    this.searchkey = key;
    this.searchvalue = '';
  }

  searchChanged(event) {
    console.log('searchChanged', event.which);
    if (event.which === 13) {
      let query = `${this.searchkey}:${this.searchvalue}`;
      this.router.navigateToRoute('search', {query});
    }
  }

  // findResults(query) {
  //   console.log('findResults', query);
  //   return ["aaone", "bbbway", "to", "go", "this"];
  // }
}
