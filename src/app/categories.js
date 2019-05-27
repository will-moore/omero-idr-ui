
import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';

import Context from './context';

@inject(Context)
export class Categories {
    @bindable studies = null;

    constructor(context) {
      this.context = context;
      this.message = 'Welcome to IDR';
      console.log('categories.studies', this.studies);

      if (this.context.studiesModel.annotationsLoaded) {
        this.loadCategoryImages();
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
}
