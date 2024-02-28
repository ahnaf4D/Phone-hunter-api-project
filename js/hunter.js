const searchResultContainer = document.getElementById('search-result-container');
const loadingAnimation = document.getElementById('loading');
const searchResult = async (searchText, isShowAll) => {
    displayLoading();
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    hideLoading();
    const data = await response.json();
    const phonesData = data.data;
    const phonesDataLength = phonesData.length;
    if (phonesDataLength === 0) {
        alert('404! Data  not found');
    }

    displayServerData(phonesData, isShowAll);
    showModals(phonesData);
    // showAllData(phonesData);
}

const displayServerData = (phones, isShowAll) => {

    const showAllBtn = document.getElementById('show-all-btn');
    if (!isShowAll) {
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
            <button class="btn btn-primary text-white text-xl font-bold" onclick = "showModals('${element.slug}') ; my_modal_1.showModal()">Show Details</button>
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
const showAllBtns = document.getElementById('show_all_btn');
showAllBtns.addEventListener('click', function (event) {
    const inputFieldText = searchInputField.value;
    searchResult(inputFieldText, true);
    showAllBtns.classList.add('hidden');
})
const showModals = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showDetailsInModal(phone);
}
const showDetailsInModal = (phone) => {
    const parent = document.getElementById('my_modal_1');
    const storeInformation = document.createElement('div');
    storeInformation.classList.add(`modal-box`);
    storeInformation.innerText = `
        <img src = '${phone.image}'/>
        <h3 class="text-2xl font-bold">${phone.phone_name}</h3>
        <p><span>Storage : ${phone?.mainFeatures.storage}</span></p>
        <p><span>Display Size : ${phone?.mainFeatures.displaySize}</span></p>
        <p><span>Chipset : ${phone?.mainFeatures.chipSet}</span></p>
        <p><span>Memory: ${phone?.mainFeatures.memory}</span></p>
        <p><span>Release Date: ${phone?.releaseDate}</span></p>
        <p><span>GPS: ${phone?.others?.GPS || 'No GPS available in this device'}</span></p>
        `   
        parent.appendChild(storeInformation);
}