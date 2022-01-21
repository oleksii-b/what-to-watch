type ProductionCountry = {
  name: string
}

namespace Movie {
  export type Poster = {
    id: number
    title: string
    poster_path: string
  }

  export type Genre = {
    id: number
    name: string
  }

  export type Details = {
    title: string
    original_title: string
    original_language: string
    production_countries: Array<ProductionCountry>
    backdrop_path: string | null
    poster_path: string | null
    homepage: string | null
    status: `Rumored` | `Planned` | `In Production` | `Post Production` | `Released` | `Canceled`
    release_date: Date
    genres: Array<Genre>
    overview: string | null
  }
}
