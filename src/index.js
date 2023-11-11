import { searchImages } from './usersApi.js';
const refs = {
  formEl: document.querySelector('.search-form'),
  formBtn: document.querySelector('.btn'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  try {
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    const images = await searchImages(searchQuery);
    console.log(searchQuery);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
