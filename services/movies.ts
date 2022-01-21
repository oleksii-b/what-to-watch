import {API_URL} from '../config'
import {fetchData} from './common'

export const getMovies = async function (category: string, page: number = 0) {
  const response = await fetchData(`${API_URL}/movie/${category}${page ? `?page=${page}` : ``}`)

  return await response.json()
}

export const getSimilarMovies = async function (id) {
  const response = await fetchData(`${API_URL}/movie/${id}/similar`)

  return await response.json()
}

export const getMovie = async function (id) {
  const response = await fetchData(`${API_URL}/movie/${id}`)

  return await response.json()
}

export const searchMovies = async function (query: string, page: number) {
  const response = await fetchData(`${API_URL}/search/movie?query=${query}${page ? `&page=${page}` : ``}`)

  return await response.json()
}
