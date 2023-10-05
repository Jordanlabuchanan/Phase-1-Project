

document.addEventListener("DOMContentLoaded", () => {
  let gamesData = []; // To store the original data
  
  //fetch json data
  fetch('http://localhost:3000/nintendoGames')
      .then(response => response.json())
      .then(data => {
          gamesData = data; // Store the original data
          
          // Function that displays games forEach for array iteration
          function displayGames(games) {
              const gameList = document.getElementById("game-list");
              gameList.innerHTML = "";

              games.forEach((game) => {
                  const gameCard = document.createElement("div");
                  gameCard.classList.add("game-card");
                  gameCard.innerHTML = `
                      <img src="${game.image}" alt="${game.name}">
                      <h2>${game.name}</h2>
                      <p>Rating: ${game.rating}</p>
                  `;

                  // Mouseover event listener 1
                  gameCard.addEventListener("mouseover", () => {
                      gameCard.style.backgroundColor = "White";
                  });

                  // Remove the mouseover effect when the mouse leaves card
                  gameCard.addEventListener("mouseout", () => {
                      gameCard.style.backgroundColor = "";
                  });

                  gameList.appendChild(gameCard);
              });
          }

          // Display all games using array iteration
          displayGames(gamesData);

          // toggle event listener 2
          const darkModeButton = document.getElementById("darkModeButton");
          darkModeButton.addEventListener("click", () => {
              // Toggle dark mode state
              darkMode = !darkMode;

              // Apply dark or light mode styles to the body
              const body = document.body;
              if (darkMode) {
                  body.classList.add("dark-mode");
              } else {
                  body.classList.remove("dark-mode");
              }
          });

          // Filter button event listener 3
          const filterButton = document.getElementById("filterButton");
          filterButton.addEventListener("click", () => {
              const ratingSelect = document.getElementById("ratingSelect");
              const selectedRating = ratingSelect.value;

              if (selectedRating === "all") {
                  // Display all games using array iteration
                  displayGames(gamesData);
              } else {
                  // Filter games by the rating using array iteration
                  const filteredGames = gamesData.filter(game => game.rating == selectedRating);
                  displayGames(filteredGames);
              }
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});

