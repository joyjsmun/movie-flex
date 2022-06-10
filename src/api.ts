import { API_KEY } from "../coinfig"

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

export interface ITv{
    backdrop_path: string,
      first_air_date: string,
      genre_ids: [
       number
      ],
      id: number,
      name: string,
      origin_country: [
       string
      ],
      original_language: string,
      original_name: string,
      overview: string, 
      popularity: number,
      poster_path: string,
      vote_average: number,
      vote_count: number
    }



export interface ITvs{
    results:ITv[],
    total_pages:number,
    total_results:number
}

export interface IResults{
    page:number,
    results:IResult[],
    total_pages:number,
    total_results:number
}

export interface IResult{
      backdrop_path: string | null,
      adult?:boolean,
      first_air_date?: string,
      genre_ids: number[],
      id: number,
      name: string,
      origin_country: string[],
      media_type: string,
      original_title?: string,
      overview: string,
      popularity: number,
      poster_path: string,
      release_date?: string,
      title?: string,
      video?:boolean,
      original_language: string,
      original_name: string,
      vote_average: number,
      vote_count: number
    }


export function getMovies(){
   return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then(res => res.json())
}

export function getTvs(){
    return fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`).then(res => res.json())
}

export function getResults(keyword:string){
    return fetch(`${BASE_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`).then(res => res.json())
}

