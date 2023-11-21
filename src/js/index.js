import {fetchBreeds, breedSelectCreate, fetchCatByBreed, catInfoMarkupCreate} from "./cat-api"

const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    catInfoBlock: document.querySelector(".cat-info")
}


fetchBreeds().then(({data}) => {
    console.log(data)
    return data
}).then((resp) => {
    refs.breedSelectEl.innerHTML = breedSelectCreate(resp)
})

refs.breedSelectEl.addEventListener('change', (e) => {
    let id = e.currentTarget.value
    fetchCatByBreed(id).then(({data}) => {
        console.log(data)
        refs.catInfoBlock.innerHTML = catInfoMarkupCreate(data)
    })
})