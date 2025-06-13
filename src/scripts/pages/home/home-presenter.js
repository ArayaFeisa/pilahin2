import HomeView from "./home-view";

export default class HomePresenter {
    constructor() {
        this._view = HomeView;
    }

    async render() {
        return this._view.render();
    }
    async afterRender() {
        this._view.bindEvents();
    }
}