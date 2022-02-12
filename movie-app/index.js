const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false&api_key=eb2f49deab864a6a43000dc5adc151c1';
const mainContainer = document.querySelector('.main-container');
const inputField = document.querySelector('.search-input');

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

getData();

function showData(data) {
  data.results.map((item, index) => {
    
    if (data.results[index].poster_path !== null && data.results[index].vote_average > 3 && data.results[index].overview !== '') {
    
      const div = document.createElement('div');
      div.classList.add('movie');
      mainContainer.append(div);

      const movie = document.querySelectorAll('.movie');
      const divPosterAndOverview = document.createElement('div');
      divPosterAndOverview.classList.add('poster-and-overview');
      movie.forEach(elem => elem.append(divPosterAndOverview));
    
      const posterAndOverview = document.querySelectorAll('.poster-and-overview');
      const img = document.createElement('img');
      img.classList.add('movie-poster');
      img.src = `https://image.tmdb.org/t/p/w1280${data.results[index].poster_path}`;
      img.alt = `${data.results[index].title}`;
      posterAndOverview.forEach(elem => elem.append(img));

      const divOverview = document.createElement('div');
      divOverview.classList.add('movie-overview');
      posterAndOverview.forEach(elem => elem.append(divOverview));

      const movieOverview = document.querySelectorAll('.movie-overview');
      const pRelease = document.createElement('p');
      pRelease.classList.add('release-year');
      pRelease.textContent = `Released: ${data.results[index].release_date.substr(0, 4)}`;
      movieOverview.forEach(elem => elem.append(pRelease));
      const h3 = document.createElement('h3');
      h3.classList.add('overview-title');
      h3.textContent = 'Overview';
      movieOverview.forEach(elem => elem.append(h3));
      const pOverview = document.createElement('p');
      pOverview.classList.add('overview-text');
      pOverview.textContent = `${data.results[index].overview}`;
      movieOverview.forEach(elem => elem.append(pOverview));

      const divInfo = document.createElement('div');
      divInfo.classList.add('movie-info');
      movie.forEach(elem => elem.append(divInfo));

      const movieInfo = document.querySelectorAll('.movie-info');
      const h2 = document.createElement('h2');
      h2.classList.add('movie-name');
      h2.textContent = `${(data.results[index].title).toLowerCase()}`;
      movieInfo.forEach(elem => elem.append(h2));
      const pRating = document.createElement('p');
      pRating.classList.add('movie-rating');
      pRating.textContent = `${data.results[index].vote_average}`;
      movieInfo.forEach(elem => elem.append(pRating));

      if (data.results[index].vote_average >= 8) {
        pRating.classList.add('green');
      } else if (data.results[index].vote_average >= 5) {
        pRating.classList.add('orange');
      } else if (data.results[index].vote_average >= 3) {
        pRating.classList.add('red');
      }
    }

  })
}

async function getSearchData() {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputField.value}&include_adult=false&api_key=eb2f49deab864a6a43000dc5adc151c1`);
  const data = await res.json();
  console.log(`Search query - '${inputField.value}'`);
  mainContainer.innerHTML = '';
  showData(data);
}

inputField.addEventListener('keypress', function runScript(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    getSearchData();
  }
})