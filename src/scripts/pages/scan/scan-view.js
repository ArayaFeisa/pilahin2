import "../../../styles/scan.css";

const ScanView = {
  videoStream: null,
  selectedImageElement: null, // untuk referensi gambar upload
  model: null, // model TensorFlow.js

  render() {
    return `
      <section class="scan-page">
        <h1 class="scan-title">Pilah</h1>

        <div class="scan-image-container">
          <img src="/images/Trash_Bin.png" alt="Tempat Sampah Recycle" class="scan-image" />
        </div>

        <div class="scan-buttons">
          <button id="upload-button" class="scan-btn" aria-label="Upload gambar dari perangkat">Upload</button>
          <button id="camera-button" class="scan-btn" aria-label="Scan langsung lewat kamera">Scan</button>
        </div>

        <div class="scan-preview-container" id="scan-preview-container">
          <!-- Preview gambar upload atau video kamera muncul di sini -->
        </div>

        <button id="pilah-button" class="scan-btn pilah-btn" aria-label="Proses dan pilah sampah">Pilah</button>

        <p id="result-text" class="scan-result-text">Hasil deteksi akan muncul di sini.</p>

        <!-- Input file tersembunyi untuk upload -->
        <input type="file" id="file-input" accept="image/*" style="display: none;" />
      </section>
    `;
  },

  async loadModel() {
    if (!this.model) {
      this.model = await window.tf.loadGraphModel('/model/model.json');
    }
  },

  async classifyImage() {
    if (!this.selectedImageElement || !this.model) {
      alert("Silakan upload gambar terlebih dahulu!");
      return;
    }

    const img = this.selectedImageElement;
    const tensor = window.tf.browser.fromPixels(img)
      .resizeNearestNeighbor([150, 150]) // sesuai input model
      .toFloat()
      .expandDims(0); // jadi batch [1, 150, 150, 3]

    const prediction = this.model.predict(tensor);
    const predictionData = await prediction.data();

    // Asumsi: output model adalah [organik, non organik, bahan berbahaya]
    const classes = ["Organik", "Non-Organik", "Bahan Berbahaya"];
    const maxIndex = predictionData.indexOf(Math.max(...predictionData));
    const label = classes[maxIndex];

    document.getElementById("result-text").innerText = `Hasil deteksi: ${label}`;
  },

  bindEvents() {
    const uploadButton = document.getElementById("upload-button");
    const cameraButton = document.getElementById("camera-button");
    const fileInput = document.getElementById("file-input");
    const previewContainer = document.getElementById("scan-preview-container");
    const pilahButton = document.getElementById("pilah-button");

    // Fungsi untuk mematikan kamera
    const stopVideoStream = () => {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        this.videoStream = null;
      }
    };

    // Upload Button Click
    uploadButton.addEventListener("click", () => {
      stopVideoStream();
      fileInput.click();
    });

    // File input change
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewContainer.innerHTML = `
            <img src="${e.target.result}" alt="Preview Gambar" id="uploaded-image" class="scan-preview-image" style="max-width:100%; max-height:100%;" />
          `;
          this.selectedImageElement = document.getElementById("uploaded-image");
        };
        reader.readAsDataURL(file);
      }
    });

    // Camera Button Click
    cameraButton.addEventListener("click", async () => {
      try {
        stopVideoStream();
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.videoStream = stream;
        previewContainer.innerHTML = `<video id="camera-preview" autoplay playsinline style="max-width:100%; max-height:100%;"></video>`;
        const videoElement = document.getElementById("camera-preview");
        videoElement.srcObject = stream;
        this.selectedImageElement = null; // pastikan hanya upload yang digunakan
      } catch (error) {
        alert("Tidak dapat mengakses kamera: " + error.message);
      }
    });

    // Tombol Pilah
    pilahButton.addEventListener("click", async () => {
      await this.loadModel();
      await this.classifyImage();
    });

    window.addEventListener("beforeunload", stopVideoStream);
    this.stopVideoStream = stopVideoStream;
  },
};

export default ScanView;
