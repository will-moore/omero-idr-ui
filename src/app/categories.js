
import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';

import Context from './context';

@inject(Context)
export class Categories {

    @bindable studies = null;

    constructor(context) {
        this.context = context;
        this.message = "Welcome to IDR";
        console.log("categories.studies", this.studies);
    }

    get timelapseStudies() {
        // let studies = this.context.studiesModel.studies;
        return this.context.studiesModel.filterStudiesByMapQuery("Study Type:time");
    }

    get lightSheetStudies() {
        // let studies = this.context.studiesModel.studies;
        return this.context.studiesModel.filterStudiesByMapQuery("Study Type:light sheet");
    }
}
