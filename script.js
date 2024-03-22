document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://api.spoonacular.com/recipes/findByNutrients";
    const apiKey = "9d82b920f7b9463fb8b0858317e310d1"; // Your actual API key

    const queryParams = {
        apiKey: apiKey,
        "minProtein": 10,
        "maxProtein": 500
    };

    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    const apiUrlWithQuery = `${apiUrl}?${queryString}`;

    function fetchDataAndDisplay() {
        fetch(apiUrlWithQuery)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the data
                displayDataInHTML(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function displayDataInHTML(data) {
        const productsContainer = document.getElementById('products-container');
        
        productsContainer.innerHTML = '';

        data.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
    
            recipeElement.innerHTML = `
                <div class="recipe-info">
                    <h2>${recipe.title}</h2>
                    <p>Calories: ${recipe.calories}</p>
                    <p>Carbs: ${recipe.carbs}</p>
                    <p>Fat: ${recipe.fat}</p>
                    <p>Protein: ${recipe.protein}</p>
                    <!-- Heart icon -->
                    <div class="like-icon">
                        <div class="heart"></div>
                    </div>
                </div>
                <div class="recipe-image">
                    <img src="${recipe.image}" alt="${recipe.title}">
                </div>
            `;
            productsContainer.appendChild(recipeElement);
        });
    }

    fetchDataAndDisplay();
});
