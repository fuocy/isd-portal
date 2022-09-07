import axios from 'axios';
import { setAuthHeader, removeAuthHeader } from './common';
import { BASE_API_URL } from 'utils/config';

export const get = async (
  url: string,
  // params : string,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false,
) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }
  if (shouldRemoveAuthHeader) {
    removeAuthHeader();
  }

  return await axios.get(BASE_API_URL + '/' + url);
};

export const post = async (
  url: string,
  params : string,
  // shouldSetAuthHeader = true,
  // shouldRemoveAuthHeader = false,
) => {
  // if (shouldSetAuthHeader) {
  //   setAuthHeader();
  // }
  // if (shouldRemoveAuthHeader) {
  //   removeAuthHeader();
  // }
  return await axios.post(BASE_API_URL + '/' + url, params);
};


