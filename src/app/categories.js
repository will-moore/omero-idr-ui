
import {inject, computedFrom} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';

import Context from './context';

@inject(Context)
export class Categories {
    @bindable studies = null;
    annotationsObserver = null;

    constructor(context) {
      this.context = context;
      this.message = 'Welcome to IDR';

      // Load thumbnails if not already loaded
      this.context.studiesModel.loadStudiesThumbnails();
    }

    // When 'ready' (map annotations loaded) we re-render this
    @computedFrom('context.studiesModel.annotationsLoaded')
    get timelapseStudies() {
      return this.context.studiesModel.filterStudiesByMapQuery('Study Type:time');
    }

    @computedFrom('context.studiesModel.annotationsLoaded')
    get lightSheetStudies() {
      return this.context.studiesModel.filterStudiesByMapQuery('Study Type:light sheet');
    }
}
