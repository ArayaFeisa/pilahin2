import "../../../styles/recycle.css";

const RecycleView = {
  render() {
    return `
      <section class="recycle-section container">
        <div class="recycle-left">
          <h1 class="recycle-title">Ayo cari bank sampah terdekatmu!</h1>
          <button id="locate-button" class="recycle-button">Cari</button>
        </div>
        <div class="recycle-right">
          <div id="map-container"></div>
        </div>
      </section>
    `;
  },
};

export default RecycleView;
