// Function to fetch and render portfolio items
function renderPortfolio() {
  let container = document.getElementById('portfolio-container');

  fetch('portfolio.json') // Fetch JSON file
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      let portfolio = data.portfolio;

      if (!portfolio || !Array.isArray(portfolio)) {
        throw new Error("Invalid JSON structure: 'portfolio' array missing or malformed");
      }

      portfolio.forEach(item => {
        let portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <h2 style="color: ${item.accentColor}">${item.title}</h2>
          <p>${item.description}</p>
          <div class="likes">Likes: <span>${item.likes}</span></div>
        `;
        container.appendChild(portfolioItem);
      });
    })
    .catch(error => {
      console.error('Error loading portfolio data:', error);
      container.innerHTML = `<p style="color: red; text-align: center;">Failed to load portfolio data. Please try again later.</p>`;
    });
}

// Render the portfolio on page load
document.addEventListener('DOMContentLoaded', renderPortfolio);
