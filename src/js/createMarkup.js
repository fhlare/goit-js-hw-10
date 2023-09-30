export function createMarkup(data) {
  return data
    .map(el => {
      return `<img src='${el.url}' width='${el.width}' height='${el.height}'/>
      <div class='text-cat'>
      <h1 class='name-cat'>${el.breeds[0].name}</h1>
      <p class='description-cat'>${el.breeds[0].description}</p>
      <p class='temperament-cat'><span class='temperament'>Temperament:</span> ${el.breeds[0].temperament}</p>
      </div>`;
    })
    .join('');
}