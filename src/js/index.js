import {fetchBreeds,
    breedSelectCreate,
    fetchCatByBreed,
    catInfoMarkupCreate,
    onFetchError} from "./cat-api"
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const refs = {
    breedSelectEl: document.querySelector(".breed-select"),
    catInfoBlock: document.querySelector(".cat-info"),
    loaderEl: document.querySelector(".loader"),
    errorEl: document.querySelector(".error")
}

refs.loaderEl.classList.replace('loader', 'is-hidden')

fetchBreeds().then(({data}) => {
    refs.loaderEl.classList.replace('is-hidden', 'loader')
    return data
}).then((resp) => {
    const arrOfOption = breedSelectCreate(resp)
    // arrOfOption.unshift({placeholder: true, text: 'Select breed'})
    const select = new SlimSelect({
        select: refs.breedSelectEl,
      
        data: arrOfOption,
        settings: {
            showSearch: false,
            // allowDeselect: true
        }
    })
    select.setSelected('Abyssinian')
    refs.loaderEl.classList.replace('loader', 'is-hidden')
}).catch(onFetchError)

refs.breedSelectEl.addEventListener('change', (e) => {
    refs.loaderEl.classList.replace('is-hidden', 'loader')
    const id = e.currentTarget.value
    
    fetchCatByBreed(id).then(({data}) => {
        const { url, breeds } = data[0];
        refs.catInfoBlock.innerHTML = catInfoMarkupCreate(breeds, url)
        refs.loaderEl.classList.replace('loader', 'is-hidden')
    }).catch(onFetchError)    
    
})