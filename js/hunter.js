const searchResultContainer = document.getElementById('search-result-container');
const loadingAnimation = document.getElementById('loading');
const searchResult = async (searchText , isShowAll) => {
    displayLoading();
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    hideLoading();
    const data = await response.json();
    const phonesData = data.data;
    const phonesDataLength = phonesData.length;
    if(phonesDataLength === 0){
        alert('404! Data  not found');
    }

    displayServerData(phonesData , isShowAll);
    // showAllData(phonesData);
}

const displayServerData = (phones , isShowAll) => {

    const showAllBtn = document.getElementById('show-all-btn');
    if(!isShowAll){
     phones = phones.slice(0, 12);

    }
    searchResultContainer.textContent = '';
    if (phones.length >= 12) {
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }

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
searchButton.addEventListener('click', () => {
    const inputFieldText = searchInputField.value;
    displayLoading();
    searchResult(inputFieldText);
})
// Loading Functionality
const displayLoading = () => {
    loadingAnimation.classList.remove('hidden');
}
const hideLoading = () => {
    loadingAnimation.classList.add('hidden');
}
const showAllBtns = document.getElementById('show_all_btn').addEventListener('click' , function(){
    const inputFieldText = searchInputField.value;
    searchResult(inputFieldText , true);
    
})