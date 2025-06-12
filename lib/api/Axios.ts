import Axios from 'axios'

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,
  withXSRFToken: true,
})

export const axiosScraping = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SCRAPING_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
