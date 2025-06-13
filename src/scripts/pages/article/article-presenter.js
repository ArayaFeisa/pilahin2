import ArticlesView from "./article-view";

export default class ArticlesPresenter {
  async render() {
    return ArticlesView.render();
  }

  async afterRender() {
    ArticlesView.bindEvents();
  }
}