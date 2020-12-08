const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'd35b7f3f';
const APP_KEY = '05c6a82bdd64f20d7ef90c36f295e2b3';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI()
});

async function fetchAPI(){
    const BASE_URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=100`
    const response = await fetch(BASE_URL)
    const data = await response.json()
    generateHTML(data.hits)
    console.log(data)
}

function generateHTML(results) {
    container.classList.remove('initial')
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="Food">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Labels: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found!'}</p>
            <p class="item-data">Health Labels: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResult.innerHTML = generatedHTML
}