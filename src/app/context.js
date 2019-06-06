import {noView} from 'aurelia-framework';
import StudiesModel from '../model/StudiesModel';

@noView
export default class Context {

    studiesModel = null;

    baseUrl = 'https://idr.openmicroscopy.org/'

    constructor() {
      this.studiesModel = new StudiesModel(this.baseUrl);
      this.studiesModel.loadStudies();
    }

}
