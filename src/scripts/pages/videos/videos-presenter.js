import VideosView from "./videos-view";

export default class VideosPresenter {
  async render() {
    return VideosView.render();
  }

  async afterRender() {
    VideosView.bindEvents();
  }
}