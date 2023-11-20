import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1"
const ENDPOINT = "breeds"

axios.defaults.headers.common["x-api-key"] = "live_oTEfphrZs5Zng1hSNcwyjGFMDqiRKNExs7GZIYlkZQCPr1iwEpQQRoirgHhfFL3F";

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/${ENDPOINT}`)
}

export function breedSelectCreate(arr) {
    return arr.map(({name, id}) =>
    `<option value="${id}">${name}</option>`
    ).join("")
}


export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
}

export function catInfomarkupCreate(arr) {
    return arr.map(({url, name, description, temperament}) =>
    `<img src="${url}" alt="${name}" class="cat-img">
    <h2 class="breed-name">Cat breed: ${name}</h2>
    <p class="breed-descr">Description of the breed: ${description}</p>
    <p class="breed-temper">Cat temperament: ${temperament}</p>`).join("")
}