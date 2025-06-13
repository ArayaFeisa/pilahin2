import "../../../styles/home.css";

const HomeView = {
  render() {
    return `
      <section id="get-start" class="get-start">
        <div class="get-start-content">
          <h1 class="get-start-title">Classify your Waste</h1>
          <p class="get-start-subtitle">
            Pilah sampah Anda dari rumah, kapan saja, di mana saja — Lebih mudah hanya dengan satu klik.
          </p>
          <button id="start-button" class="start-button" aria-label="Mulai menggunakan Pilahin!">
            Get Start
          </button>
        </div>
      </section>

      <section id="our-features" class="our-features">
        <h2 class="features-title">Our Features</h2>
        <p class="features-subtitle">Kami tidak hanya membuat platform, tapi menghadirkan solusi pintar untuk memilah sampah lewat teknologi, edukasi, dan kemudahan akses bagi semua.</p>
        <div class="features-cards">
          <div class="feature-card">
            <h3>Smart Waste</h3>
            <p>Praktis, cepat, dan bisa kamu lakukan langsung dari rumah.</p>
          </div>
          <div class="feature-card">
            <h3>Eco Education</h3>
            <p>Belajar jadi lebih seru lewat video dan artikel seputar lingkungan, daur ulang, dan gaya hidup berkelanjutan.</p>
          </div>
          <div class="feature-card">
            <h3>Recycle Near Me</h3>
            <p>Cukup ketik lokasi, dan mulai berkontribusi langsung dari lingkungan sekitar.</p>
          </div>
        </div>
      </section>

      <section id="about-us" class="about-us">
        <div class="about-us-image">
          <img src="/images/about-us.png" alt="Tentang Pilahin" />
        </div>
        <div class="about-us-content">
          <h2 class="about-us-title">About Us</h2>
          <p class="about-us-subtitle">
            Pilahin adalah platform digital yang membantu masyarakat memilah sampah dengan mudah lewat teknologi AI. Kami juga menyediakan edukasi seputar lingkungan dan peta lokasi Bank Sampah untuk mendukung aksi nyata dari rumah. Semua dalam satu aplikasi yang praktis dan ramah pengguna.
          </p>
          <p class="about-us-subtitle">
            Misi kami adalah membangun kebiasaan ramah lingkungan yang inklusif dan berkelanjutan. Dengan Pilahin, kami percaya setiap orang bisa ikut berkontribusi menjaga bumi—mulai dari langkah kecil yang sederhana.
          </p>
        </div>
      </section>
      
      <section id="education-options" class="education-options">
        <h2 class="education-title">Education Options</h2>
        <div class="education-cards">
          <div class="education-card">
            <div class="card-content">
              <h3>News and Article</h3>
              <ul>
                <li>Artikel dan berita terbaru seputar pengelolaan sampah dan lingkungan</li>
                <li>Tips praktis untuk mengurangi sampah rumah tangga</li>
                <li>Trend dan inovasi teknologi hijau di Indonesia</li>
                <li>Cerita inspirasi dari komunitas dan pegiat lingkungan</li>
              </ul>
            </div>
            <a href="#/article" class="see-more-button">See More</a>
          </div>
          <div class="education-card">
            <div class="card-content">
              <h3>Education Videos</h3>
              <ul>
                <li>Video tutorial tentang cara memilah sampah organik dan anorganik</li>
                <li>Panduan membuat kerajinan dari barang bekas</li>
                <li>Konten edukatif untuk anak-anak tentang pentingnya menjaga bumi</li>
                <li>Kampanye lingkungan dengan pendekatan kreatif dan etnik</li>
              </ul>
            </div>
            <a href="#/videos" class="see-more-button">See More</a>
          </div>
        </div>
      </section>

      <footer class="main-footer">
        <div class="footer-content container">
          <div class="footer-info">
            <img src="./images/Pilahin.png" alt="Pilahin Logo" class="footer-logo">
            <div class="address">
              <p>Alamat Kantor:</p>
              <p>Jl. Hijau Lestari No. 88, Kelurahan Sukamaju,Kecamatan Mandalika, Kota Bandung, Jawa Barat, 40291.</p>
            </div>
            <div class="contact-info">
              <p>Email: support@pilahin.id</p>
              <p>Telepon: +62 812-3456-7890</p>
              <p>Instagram: @pilahin.id</p>
              <p>Facebook: Pilahin Indonesia</p>
            </div>
          </div>
          <div class="footer-links">
            <div class="link-column">
              <div class="link-group">
                <a href='#'>Work With Us</a>
                <a href="#">Private Coaching</a>
                <a href="#">About Us</a>
              </div>
              <div class="link-group">
                <a href="#">Our Works</a>
                <a href="#">FAQs</a>
              </div>
            </div>
            <div class="link-column">
              <div class="link-group">
                <a href="#">Support Us</a>
                <a href="#">Our Commitment</a>
                <a href="#">Report a Bug</a>
                <a href="#">Business Advices</a>
                <a href="#">Our Team</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    `;
  },

  bindEvents() {
    document.getElementById("start-button")?.addEventListener("click", () => {
      window.location.hash = "/scan";
    });
  },
};

export default HomeView;
