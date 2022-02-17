import axios from "axios";

const API_BASIC_URL = "https://pixabay.com/api/";
const API_KEY = "24403830-5f6faa5cd05cf016990252735";
const TYPE = "photo";
const ORIENTATION = "horizontal";
const PERPAGE = 12;

export const get = (query, page) => {
  return axios.get(
    `${API_BASIC_URL}?key=${API_KEY}&q=${query}&image_type=${TYPE}&page=${page}&orientation=${ORIENTATION}&per_page=${PERPAGE}`
  );
};
