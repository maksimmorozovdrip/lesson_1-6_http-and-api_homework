const API_URL = "http://localhost:3000/movies"


loadMovies();








async function loadMovies() {
    const response = await fetch(API_URL);
    if (!response.ok){
throw new Error("Данные не были получены");
    }
    const apiData = await response.json();

renderMovies(apiData);
}

function renderMovies(movies) {
    console.log(movies);
}