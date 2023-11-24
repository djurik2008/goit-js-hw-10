import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://api.thecatapi.com/v1"
const ENDPOINT = "breeds"

axios.defaults.headers.common["x-api-key"] = "live_oTEfphrZs5Zng1hSNcwyjGFMDqiRKNExs7GZIYlkZQCPr1iwEpQQRoirgHhfFL3F";

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/${ENDPOINT}`)
}

export function breedSelectCreate(arr) {
    return arr.map(({name, id}) => {
        const option = {}
        option.text = name
        option.value = id
        return option
    })
}


export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
}

export function catInfoMarkupCreate(arr, url) {
    return arr.map(({ name,
        description,
        temperament,
        alt_names }) =>
    `<div class="box-img"><img src="${url}" alt="${alt_names}" class="cat-img" width="400"></div>
    <div class="box-info">
    <h2 class="breed-name">${name}</h2>
    <p class="breed-descr">${description}</p>
    <p class="breed-temper"><em>Temperament:</em> ${temperament}</p>
    </div>`).join("")
}

export function onFetchError(error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};