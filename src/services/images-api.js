import axios from "axios";

const fetchDataApi = async (searchQuery, currentpage) => {
  const API_BASIC_URL = "https://pixabay.com/api/";
  const API_KEY = "24403830-5f6faa5cd05cf016990252735";
  const TYPE = "photo";
  const ORIENTATION = "horizontal";
  const PERPAGE = 12;
  const res = await axios.get(
    `${API_BASIC_URL}?key=${API_KEY}&q=${searchQuery}&image_type=${TYPE}&page=${currentpage}&orientation=${ORIENTATION}&per_page=${PERPAGE}`
  );
  return res.data;
};

export default fetchDataApi;
