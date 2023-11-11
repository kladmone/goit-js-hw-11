import axios from 'axios';
export async function searchImages(query) {
  const apiKey = '40604957-a713f0ac0088deb25f7100ca0';
  const apiUrl = 'https://pixabay.com/api/';
  const perPage = 40;
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const images = response.data.hits;
    return images;
  } catch (error) {
    console.log(error);
  }
}
