import {fetchBreeds, breedSelectCreate, fetchCatByBreed, catInfomarkupCreate} from "./cat-api"

const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    catInfoBlock: document.querySelector(".cat-info")
}


fetchBreeds().then(({data}) => {
    return data
}).then((resp) => {
    refs.breedSelectEl.innerHTML = breedSelectCreate(resp)
})

refs.breedSelectEl.addEventListener('change', (e) => {
    let id = e.currentTarget.value
    fetchCatByBreed(id).then(({data}) => {
        console.log(data[0].breeds)
        refs.catInfoBlock.innerHTML = catInfomarkupCreate(data[0].breeds)
    })
})