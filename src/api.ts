const API_KEY ="e11764caf2aa106737a0d02f13e03708"
const BASE_URL = "https://api.themoviedb.org/3/"

export interface IMovie{
    backdrop_path: string,
    id: number,
    original_title: string
    overview: string,
    popularity:  number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number
    vote_count: number
    }
    
export interface IMovies{
        dates :{
            maximum: number,
            minimum: number
        }
        page: number,
        results :IMovie[],
        total_pages: number,
        total_results:number
    }


export function getMovies(){
   return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then(res => res.json())
}