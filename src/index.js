import {fetchBreeds, breedSelectCreate} from "./cat-api"

const refs = {
    breedSelectEl: document.querySelector(".breed-select")
}


fetchBreeds().then(({data}) => {
    return data
}).then((resp) => {
    refs.breedSelectEl.innerHTML = breedSelectCreate(resp)
    refs.breedSelectEl.addEventListener('select', showCatInfo)
})
