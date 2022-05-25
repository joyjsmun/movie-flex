const API_KEY ="e11764caf2aa106737a0d02f13e03708"
const BASE_URL = "https://api.themoviedb.org/3/"

export function getMovies(){
   return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then(res => res.json())
}