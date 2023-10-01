const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_8LWadP2bbMxFPHEiWoFqA8j4jiSCDxnTrZi6vO5RIIptqgnKrN469baSV9U0IDDt';

const options = {
  headers: {
    'x-api-key': API_KEY,
  }
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}


export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}