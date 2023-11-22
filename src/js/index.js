import {fetchBreeds, breedSelectCreate, fetchCatByBreed, catInfoMarkupCreate} from "./cat-api"
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    catInfoBlock: document.querySelector(".cat-info"),
    loaderEl: document.querySelector(".loader"),
    errorEl: document.querySelector(".error")
}

fetchBreeds().then(({data}) => {
    // refs.loaderEl.classList.remove('is-hidden')
    return data
}).then((resp) => {
    const arrOfOption = breedSelectCreate(resp)
    arrOfOption.unshift({placeholder: true, text: 'Select breed'})
    new SlimSelect({
        select: refs.breedSelectEl,
      
        data: arrOfOption,
        settings: {
            showSearch: false,
            allowDeselect: true
        }
    })
    refs.loaderEl.classList.remove('is-hidden')
})

refs.breedSelectEl.addEventListener('change', (e) => {
    const id = e.currentTarget.value
    fetchCatByBreed(id).then(({data}) => {
        refs.catInfoBlock.innerHTML = catInfoMarkupCreate(data[0].breeds)
    }).catch((err) => {
        console.log(err)
    })
})