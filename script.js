document.addEventListener("DOMContentLoaded", function() {
    // Define the API endpoint and your API key
    const apiUrl = "https://api.spoonacular.com/recipes/findByNutrients";
    const apiKey = "9d82b920f7b9463fb8b0858317e310d1"; // Your actual API key

    // Define the parameters including the API key
    const queryParams = {
        apiKey: apiKey,
        "minProtein": 10,
        "maxProtein": 500
    };

    // Convert parameters to query string
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    // API endpoint with query string
    const apiUrlWithQuery = `${apiUrl}?${queryString}`;

    // Function to fetch data from API and display it in HTML
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

    // Function to display data in HTML
    function displayDataInHTML(data) {
        const productsContainer = document.getElementById('products-container');
        
        // Clear previous content
        productsContainer.innerHTML = '';

        // Loop through the products and create HTML elements
        data.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
    
            // HTML structure for each recipe, including the heart icon
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

    // Call the function to fetch and display data
    fetchDataAndDisplay();
});
