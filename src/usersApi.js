import axios from 'axios';

const apiKey = '40604957-a713f0ac0088deb25f7100ca0';
const apiUrl = 'https://pixabay.com/api/';
export const perPage = 40;
export let currentPage = 1;

export async function searchImages(query) {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const { hits, totalHits } = response.data;
    currentPage += 1;
    return { hits, totalHits };
  } catch (error) {
    console.log(error);
  }
}

export function resetPage() {
  currentPage = 1;
}
