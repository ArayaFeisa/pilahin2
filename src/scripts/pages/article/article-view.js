import "../../../styles/article.css";
import { localArticles } from "../../data/data-articles";

const ArticlesView = {
  async render() {
    let articles = [];
    
    try {
      // Try to fetch from NewsAPI first
      articles = await this.fetchArticlesFromAPI();
    } catch (error) {
      console.error("Failed to fetch articles from API, using local data:", error);
      // Fallback to local data if API fails
      articles = this.formatLocalArticles(localArticles);
    }
    
    // Ensure only 5 articles are shown
    const displayedArticles = articles.slice(0, 5);
    
    return `
      <section class="articles-page">
        <div class="articles-header">
          <h1 class="articles-title">Article and News</h1>
          <p class="articles-subtitle">Stay updated with the latest news and articles about waste management and environmental protection</p>
        </div>
        
        <div class="articles-grid">
          ${displayedArticles.map(article => `
            <article class="article-card" data-id="${article.id}">
              <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" />
              <div class="article-content">
                <span class="article-source">${article.source}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <span class="article-date">${article.date}</span>
              </div>
            </article>
          `).join('')}
        </div>
        
        <a href="#/education" class="back-button">Back to Education</a>
      </section>
    `;
  },

  async fetchArticlesFromAPI() {
    const NEWS_API_KEY = '7a32c925962241139c4944adc150c2b9';
    const NEWS_API_URL = 'https://newsapi.org/v2/everything';
    
    const query = 'waste management OR recycling OR "environmental protection"';
    const pageSize = 5; // Changed from 6 to 5 to only request 5 articles
    const sortBy = 'publishedAt';
    
    const response = await fetch(
      `${NEWS_API_URL}?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`News API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return this.formatApiArticles(data.articles);
  },

  formatApiArticles(apiArticles) {
    // Take only first 5 articles if somehow more were returned
    return apiArticles.slice(0, 5).map((article, index) => ({
      id: `api-${index}`,
      title: article.title,
      excerpt: article.description || 'No description available',
      source: article.source?.name || 'Unknown Source',
      date: new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      image: article.urlToImage || '/images/article-placeholder.jpg',
      url: article.url
    }));
  },

  formatLocalArticles(localArticles) {
    // Take only first 5 articles from local data
    return localArticles.slice(0, 5).map((article, index) => ({
      id: `local-${index}`,
      title: article.title,
      excerpt: article.description,
      source: 'Local Database',
      date: new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      image: article.urlToImage || '/images/article-placeholder.jpg',
      url: article.url
    }));
  },

  bindEvents() {
    document.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-id');
        this.showArticleDetail(articleId);
      });
    });
  },

  async showArticleDetail(articleId) {
    let articles = [];
    
    try {
      articles = await this.fetchArticlesFromAPI();
    } catch (error) {
      articles = this.formatLocalArticles(localArticles);
    }
    
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content" id="modal-content">
        <button class="modal-close">&times;</button>
        <img src="${article.image}" alt="${article.title}" class="modal-image" />
        <div class="modal-body">
          <h2 class="modal-title">${article.title}</h2>
          <p class="modal-text">${article.excerpt}</p>
          <p class="modal-text">This is a detailed view of the article. In a real implementation, you would fetch the full content from the source.</p>
          <span class="modal-source">Source: ${article.source}</span>
          <span class="modal-date">Published: ${article.date}</span>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="external-link">Read Full Article</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close when clicking the X button
    modal.querySelector('.modal-close').addEventListener('click', () => {
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

export default ArticlesView;