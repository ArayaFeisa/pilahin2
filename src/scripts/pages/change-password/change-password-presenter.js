import ChangePasswordView from "./change-password-view";

export default class ChangePasswordPresenter {
  async render() {
    return ChangePasswordView.render();
  }

  async afterRender() {
    ChangePasswordView.bindEvents();
  }
}