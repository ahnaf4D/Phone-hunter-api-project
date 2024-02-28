const searchResultContainer = document.getElementById('search-result-container');
console.log(searchResultContainer);
const searchResult = async(searchText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json();
    displayServerData(data.data);
}

const displayServerData = (phones) => {
    console.log(phones);
    phones.forEach(element => {
        const createCardElement = document.createElement('div');
        createCardElement.classList = `card bg-base-100 shadow-xl`
        createCardElement.innerHTML = `
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary text-white text-xl font-bold">Show Details</button>
          </div>
        </div>
        `
        searchResultContainer.appendChild(createCardElement);
    })
}

const searchButton = document.getElementById('search-phone-button');
// Search Input Field Data
const searchInputField = document.getElementById('search-phone-field');
searchButton.addEventListener('click',()=>{
    const inputFieldText = searchInputField.value;
    searchResult(inputFieldText);

})
