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

export function catInfoMarkupCreate(arr) {
    return arr.map(({ name,
        description,
        temperament,
        alt_names,
        reference_image_id: img_id }) =>
    `<img src="https://cdn2.thecatapi.com/images/${img_id}.jpg" alt="${alt_names}" class="cat-img">
    <h2 class="breed-name">${name}</h2>
    <p class="breed-descr">${description}</p>
    <p class="breed-temper">temperament: ${temperament}</p>`).join("")
}