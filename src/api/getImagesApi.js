import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35802971-9f205e77cee7d2465290329c6';
export const PER_PAGE = 12;

export const getImagesApi = async (searchText, currentPage) => {
  return axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
      page: currentPage,
    },
  });
};
