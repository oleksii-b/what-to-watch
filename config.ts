export const API_URL = `https://api.themoviedb.org/3`

export enum Route {
  Home = '/',
  Films = '/films',
  Film = '/film',
  SignUp = '/sign-up',
  Account = '/account',
}

export enum AccountRoute {
  Profile = '/',
  Watchlist = '/watchlist',
  Favorites = '/favorites',
}

export enum FilmGroup {
  'Popular' = 'popular',
  'Now Playing' = 'now_playing',
  'Upcoming' = 'upcoming',
}
