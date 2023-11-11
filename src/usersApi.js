const axios = require('axios');

export async function searchImages(query) {
  const apiKey = '40604957-a713f0ac0088deb25f7100ca0';
  const apiUrl = 'https://pixabay.com/api/';
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const images = response.data.hits;
    console.log(images);
    return images;
  } catch (error) {
    console.log(error);
  }
}
