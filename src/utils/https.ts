import axios, { AxiosResponse } from 'axios'

export const http = axios;

type ApiResponse = {
  data?: any,
  errors?: any,
}

export const checkErrors = (response: AxiosResponse) => {
  const errors = response?.data?.errors
  if(errors) {
    if(errors.includes("Invalid Token")) {
      // not logged in
    }
  }
  return !!errors
}