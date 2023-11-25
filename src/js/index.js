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

refs.catInfoBlock.classList.add('is-hidden')


fetchBreeds().then(({data}) => {
    refs.loaderEl.classList.replace('loader', 'is-hidden')
    // refs.loaderEl.classList.replace('is-hidden', 'loader')
    return data
}).then((resp) => {
    const arrOfOption = breedSelectCreate(resp)
    arrOfOption.unshift({placeholder: true, text: 'Select breed'})
    const select = new SlimSelect({
        select: refs.breedSelectEl,
      
        data: arrOfOption,
        settings: {
            showSearch: false,
            // allowDeselect: true
        }
    })
    refs.loaderEl.classList.replace('loader', 'is-hidden')
}).catch(onFetchError)

refs.breedSelectEl.addEventListener('change', (e) => {
    refs.catInfoBlock.classList.add('is-hidden')

    refs.loaderEl.classList.replace('is-hidden', 'loader')
    const id = e.currentTarget.value
    if (id === 'Select breed') return
    
    fetchCatByBreed(id).then(({data}) => {
        const { url, breeds } = data[0];
        refs.catInfoBlock.innerHTML = catInfoMarkupCreate(breeds, url)
        refs.loaderEl.classList.replace('loader', 'is-hidden')
        refs.catInfoBlock.classList.remove('is-hidden')
    }).catch(onFetchError)
})