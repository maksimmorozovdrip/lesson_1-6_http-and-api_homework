const API_URL = "http://localhost:3000/movies";

const endpointElement = document.querySelector('[data-ui="endpoint"]');
const statusElement = document.querySelector('[data-ui="status"]');
const statusTitleElement = statusElement.querySelector(".status__title");
const statusTextElement = statusElement.querySelector(".status__text");
const collectionElement = document.querySelector('[data-ui="collection"]');
const reloadButton = document.querySelector('[data-action="reload"]');

function showStatus(title, text) {
  statusTitleElement.textContent = title;
  statusTextElement.textContent = text;
  statusElement.hidden = false;
  collectionElement.replaceChildren();
}

function hideStatus() {
  statusElement.hidden = true;
}

function createMovieCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const title = document.createElement("h3");
  title.className = "movie-card__title";
  title.textContent = movie.title;

  const director = document.createElement("p");
  director.className = "movie-card__director";
  director.textContent = movie.director;

  const year = document.createElement("p");
  year.className = "movie-card__year";
  year.textContent = `Год: ${movie.year}`;

  const rating = document.createElement("p");
  rating.className = "movie-card__rating";
  rating.textContent = `Оценка: ${movie.rating}`;

  const watched = document.createElement("span");
  watched.className = movie.watched
    ? "movie-card__badge movie-card__badge--watched"
    : "movie-card__badge";
  watched.textContent = movie.watched ? "Просмотрено" : "Не просмотрено";

  card.append(title, director, year, rating, watched);
  return card;
}

function renderMovies(movies) {
  collectionElement.replaceChildren(...movies.map(createMovieCard));
}

async function fetchMovies() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  return response.json();
}

async function loadMovies() {
  reloadButton.disabled = true;
  showStatus("Загрузка", "Получаем список фильмов…");
  try {
    const movies = await fetchMovies();
    if (movies.length === 0) {
      showStatus("Список пуст", "Пока нет ни одного фильма.");
      return;
    }
    hideStatus();
    renderMovies(movies);
  } catch (error) {
    console.error(error);
    showStatus("Ошибка", "Не удалось загрузить фильмы. Нажмите «Обновить», чтобы повторить.");
  } finally {
    reloadButton.disabled = false;
  }
}

endpointElement.textContent = API_URL;
reloadButton.addEventListener("click", loadMovies);
loadMovies();