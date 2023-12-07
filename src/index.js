

document.addEventListener("DOMContentLoaded", () => {
    let gamesData = [];
  
    fetch('http://localhost:3000/nintendoGames')
      .then(response => response.json())
      .then(data => {
        gamesData = data;
  
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
  
            gameCard.addEventListener("mouseover", () => {
              gameCard.style.backgroundColor = "grey";
            });
  
            gameCard.addEventListener("mouseout", () => {
              gameCard.style.backgroundColor = "";
            });
  
            gameList.appendChild(gameCard);
          });
        }
  
        displayGames(gamesData);
  
        const darkModeButton = document.getElementById("darkModeButton");
        const darkModeStyles = document.getElementById("darkModeStyles");
        let darkMode = false;
  
        darkModeButton.addEventListener("click", () => {
          darkMode = !darkMode;
          const body = document.body;
          if (darkMode) {
            body.classList.add("dark-mode");
            darkModeStyles.removeAttribute("disabled");
          } else {
            body.classList.remove("dark-mode");
            darkModeStyles.setAttribute("disabled", "true");
          }
        });
  
        const filterButton = document.getElementById("filterButton");
        filterButton.addEventListener("click", () => {
          const ratingSelect = document.getElementById("ratingSelect");
          const selectedRating = ratingSelect.value;
  
          if (selectedRating === "all") {
            displayGames(gamesData);
          } else {
            const filteredGames = gamesData.filter(game => game.rating == selectedRating);
            displayGames(filteredGames);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  

