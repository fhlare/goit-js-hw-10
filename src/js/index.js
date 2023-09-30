import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createMarkup } from './createMarkup.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds().then(onRender).catch(onError);

function onRender(data) {
  data = data.filter(img => img.image?.url != null);
  const storedBreeds = data;

  const options = storedBreeds
    .filter(breed => breed.image)
    .map(breed => {
      let option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });
  
  refs.breedSelect.append(...options);
  selectStyled();
  refs.loader.classList.remove('loader-is-visible');
}

function selectStyled() {
  new SlimSelect({
    select: refs.breedSelect,
  });
}

refs.breedSelect.addEventListener('change', onChange);

function onChange(e) {
  refs.loader.classList.add('loader-is-visible');
  const option = e.currentTarget;
  const selectedOption = option.value;


  fetchCatByBreed(selectedOption)
    .then(res => {
      refs.catInfo.innerHTML = createMarkup(res);
      refs.loader.classList.remove('loader-is-visible');
    })
    .catch(onError);
}

function onError() {
  refs.loader.classList.remove('loader-is-visible');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}