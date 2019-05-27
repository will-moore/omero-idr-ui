
import {inject} from 'aurelia-framework';
import {BindingEngine, bindable} from 'aurelia-framework';

import Context from './context';

@inject(Context, BindingEngine)
export class Categories {
    @bindable studies = null;
    annotationsObserver = null;

    constructor(context, bindingEngine) {
      this.context = context;
      this.bindingEngine = bindingEngine;
      this.message = 'Welcome to IDR';
    }

    bind() {
      this.waitForAnnotationsLoaded();
    }

    waitForAnnotationsLoaded() {
      if (this.regions_info === null) return;

      // tear down old observers
      this.unregisterObservers();
      if (this.context.studiesModel.annotationsLoaded) {
        this.loadCategoryImages();
        return;
      }

      // we are not yet ready, wait for ready via observer
      if (this.annotationsObserver === null) {
        this.annotationsObserver = this.bindingEngine
          .propertyObserver(this.context.studiesModel, 'annotationsLoaded')
          .subscribe((newValue, oldValue) => this.loadCategoryImages());
      }
    }

    loadCategoryImages() {
      let model = this.context.studiesModel;
      let queries = ['Study Type:time', 'Study Type:light sheet'];
      let studyIds = [];
      queries.forEach(q => {
        let studies = model.filterStudiesByMapQuery(q);
        studies.forEach(s => studyIds.push(s.type + '-' + s.id));
      });
      model.loadStudiesThumbnails(studyIds);
    }

    get timelapseStudies() {
      // let studies = this.context.studiesModel.studies;
      return this.context.studiesModel.filterStudiesByMapQuery('Study Type:time');
    }

    get lightSheetStudies() {
      // let studies = this.context.studiesModel.studies;
      return this.context.studiesModel.filterStudiesByMapQuery('Study Type:light sheet');
    }

    unregisterObservers(property_only = false) {
      if (this.annotationsObserver) {
        this.annotationsObserver.dispose();
        this.annotationsObserver = null;
      }
    }
}
