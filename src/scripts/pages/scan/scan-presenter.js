import ScanView from "./scan-view";

export default class ScanPresenter {
  async render() {
    return ScanView.render();
  }

  async afterRender() {
    ScanView.bindEvents();
  }

  destroy() {
    if (ScanView.stopVideoStream) {
      ScanView.stopVideoStream();
    }
  }
}
