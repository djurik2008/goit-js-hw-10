import {fetchBreeds, breedSelectCreate, fetchCatByBreed, catInfoMarkupCreate} from "./cat-api"

const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    catInfoBlock: document.querySelector(".cat-info")
}


fetchBreeds().then(({data}) => {
    return data
}).then((resp) => {
    refs.breedSelectEl.innerHTML = breedSelectCreate(resp)
    console.dir(refs.breedSelectEl)
})

refs.breedSelectEl.addEventListener('change', (e) => {
    let id = e.currentTarget.value
    fetchCatByBreed(id).then(({data}) => {
        refs.catInfoBlock.innerHTML = catInfoMarkupCreate(data[0].breeds)
    })
})