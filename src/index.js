import Notiflix from 'notiflix';
import { resetPage, searchImages } from './usersApi.js';
import { getTotalHits } from './usersApi.js';

const refs = {
  formEl: document.querySelector('.search-form'),
  formBtn: document.querySelector('.btn'),
  gallery: document.querySelector('.gallery'),
  loadBtnElem: document.querySelector('.load-more'),
};

const hiddenClass = 'hidden';

function showLoadMoreButton() {
  refs.loadBtnElem.classList.remove(hiddenClass);
}

function hideLoadMoreButton() {
  refs.loadBtnElem.classList.add(hiddenClass);
}

async function onFormSubmit(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value;
  if (!query || /^\s*$/.test(query)) {
    Notiflix.Notify.warning('Please enter a valid search query.');
    return;
  }
  try {
    const images = await searchImages(query);
    resetPage();
    if (images.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreButton();
      return;
    }
    renderImages(images);
    showLoadMoreButton();
  } catch (error) {
    console.log(error);
  }
  if (!hasMoreImages(images)) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    hideLoadMoreButton();
  }
}

async function onClickLoad() {
  try {
    const query = refs.formEl.elements.searchQuery.value;
    const images = await searchImages(query);
    if (images.length === 0) {
      hideLoadMoreButton();
      return;
    }
    renderImages(images);
  } catch (error) {
    console.log(error);
  }
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadBtnElem.addEventListener('click', onClickLoad);

function renderTemplate({ webformatURL, likes, views, comments, downloads }) {
  return `<div class="photo-card">
    <img class="photo" src="${webformatURL}" alt="No description" loading="lazy" />
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
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function hasMoreImages(images) {
  const displayedImagesCount = images.length;
  const totalHits = getTotalHits();

  return displayedImagesCount < totalHits;
}
