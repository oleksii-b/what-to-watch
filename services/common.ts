import fetch from 'node-fetch'
import {API_URL} from '../config'

export const hasDuplicateValues = function (data: object): boolean {
  const values: string[] = Object.values(data)

  return values.length !== new Set(values).size
}

export const fetchData = async function (url: string, data?: object) {
  const api = {
    url: new URL(url),
  }

  if (api.url.origin === new URL(API_URL).origin) {
    api.url.searchParams.set('api_key', 'ae086cca7012cf39ab3bddd24f252411')

    return await fetch(api.url.toString(), data)
  }

  return await fetch(url, data)
}
