import "../../../styles/videos.css";
import { localVideos } from "../../data/data-videos";

const VideosView = {
  async render() {
    let videos = [];
    
    try {
      // Try to fetch from YouTube API first
      videos = await this.fetchVideosFromAPI();
    } catch (error) {
      console.error("Failed to fetch videos from API, using local data:", error);
      // Fallback to local data if API fails
      videos = this.formatLocalVideos(localVideos);
    }
    
    return `
      <section class="videos-page">
        <div class="videos-header">
          <h1 class="videos-title">Educational Videos</h1>
          <p class="videos-subtitle">Learn about waste management and recycling through these informative videos</p>
        </div>
        
        <div class="videos-grid">
          ${videos.map(video => `
            <div class="video-card" data-id="${video.id}">
              <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" />
                <div class="play-button">▶</div>
              </div>
              <div class="video-content">
                <span class="video-source">${video.source}</span>
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <span class="video-duration">${video.duration}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <a href="#/education" class="back-button">Back to Education</a>
      </section>
    `;
  },

  async fetchVideosFromAPI() {
    const YOUTUBE_API_KEY = 'AIzaSyD7nU8LN81uEHs32qBCRvNwaPvxXWnNuTc';
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
    
    const query = 'waste management recycling';
    const maxResults = 6;
    
    const response = await fetch(
      `${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&q=${query}&part=snippet&maxResults=${maxResults}&type=video`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return this.formatApiVideos(data.items);
  },

  formatApiVideos(apiVideos) {
    return apiVideos.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      source: 'YouTube',
      duration: 'N/A', // YouTube API doesn't provide duration in search results
      thumbnail: video.snippet.thumbnails.medium.url,
      videoId: video.id.videoId
    }));
  },

  formatLocalVideos(localVideos) {
    return localVideos.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      source: 'Local Database',
      duration: 'N/A',
      thumbnail: video.snippet.thumbnails.medium.url,
      videoId: video.id.videoId
    }));
  },

  bindEvents() {
    document.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-id');
        this.showVideoPlayer(videoId);
      });
    });
  },

  async showVideoPlayer(videoId) {
    let videos = [];
    
    try {
      videos = await this.fetchVideosFromAPI();
    } catch (error) {
      videos = this.formatLocalVideos(localVideos);
    }
    
    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    const modal = document.createElement('div');
    modal.className = 'video-modal-overlay';
    modal.innerHTML = `
      <div class="video-modal-content" id="video-modal-content">
        <button class="video-modal-close">&times;</button>
        <div class="video-container">
          <iframe src="https://www.youtube.com/embed/${video.videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="video-modal-body">
          <h2 class="video-modal-title">${video.title}</h2>
          <p class="video-modal-description">${video.description}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close when clicking the X button
    modal.querySelector('.video-modal-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Close when clicking outside the modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', escHandler);
      }
    });
  }
};

export default VideosView;