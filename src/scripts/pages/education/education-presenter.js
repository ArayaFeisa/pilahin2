import EducationView from "./education-view";

export default class EducationPresenter {
    constructor() {
        this._view = EducationView;
    }

    async render() {
        return this._view.render();
    }
    
    async afterRender() {
        this._view.bindEvents();
    }
}