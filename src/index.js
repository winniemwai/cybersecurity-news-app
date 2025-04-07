const apiKey = "8cb67ba3630d081c4a8faf78c3177496"; // 👈 Replace with your real key
const newsContainer = document.getElementById("news-container");
const loader = document.getElementById("loader");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const toggleTheme = document.getElementById("toggle-theme");
const body = document.body;

// Default keywords
let currentQuery = "cybercrime hacking phishing ransomware malware";

function showLoader() {
  loader.classList.remove("hidden");
  newsContainer.innerHTML = "";
}

function hideLoader() {
  loader.classList.add("hidden");
}

async function fetchNews(query) {
  showLoader();
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query
      )}&lang=en&token=${apiKey}`
    );
    const data = await response.json();

    hideLoader();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found for that search 🫠</p>";
      return;
    }

    newsContainer.innerHTML = "";
    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "news-item";
      card.innerHTML = `
        <h2>${article.title}</h2>
        <p><strong>Source:</strong> ${article.source.name}</p>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Fetch error:", err);
    hideLoader();
    newsContainer.innerHTML = "<p>Oops. Something went wrong 🧨</p>";
  }
}

// Theme toggle
toggleTheme.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
});

// Search button
searchBtn.addEventListener("click", () => {
  const input = searchInput.value.trim();
  currentQuery = input.length ? input : "cybercrime";
  fetchNews(currentQuery);
});

// Initial load
fetchNews(currentQuery);
