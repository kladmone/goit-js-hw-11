import Notiflix from 'notiflix';
import { searchImages } from './usersApi.js';
const refs = {
  formEl: document.querySelector('.search-form'),
  formBtn: document.querySelector('.btn'),
  gallery: document.querySelector('.gallery'),
};
let query = '';
refs.formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value;
  try {
    const images = await searchImages(query);
    if (images.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderImages(images);
  } catch (error) {
    console.log(error);
  }
}

function renderTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
}
function renderImages(array) {
  const markup = array.map(renderTemplate).join('');
  refs.gallery.innerHTML = markup;
}
