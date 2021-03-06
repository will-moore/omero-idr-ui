import 'core-js/stable';
import 'regenerator-runtime/runtime';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import jQuery from 'jquery';
import { Foundation } from 'foundation-sites/js/foundation.core';
import Context from './app/context';

// import {RouterConfiguration, Router} from 'aurelia-router';
// import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
// import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';

import 'foundation-sites/dist/css/foundation.min.css';
import './resources/css/idr.css';

export function configure(aurelia) {

  // see https://github.com/zurb/foundation-sites/issues/7386
  Foundation.addToJquery(jQuery);
  // Foundation.plugin(Dropdown, 'Dropdown');
  // Foundation.plugin(DropdownMenu, 'DropdownMenu');
  // etc as needed - NB: need to import above

  // Export jQuery
  window.$ = jQuery;
  window.jQuery = jQuery;

  // Initialise foundation
  jQuery(() => {
    jQuery(document).foundation();
  });

  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn')
    .plugin(PLATFORM.moduleName('aurelia-autocomplete'));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  let ctx = new Context();
  // make the context available everywhere
  aurelia.container.registerInstance(Context, ctx);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/app')));
}
