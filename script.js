const teamsDiv = document.getElementById('teams');
const playersDiv = document.getElementById('players');

if (teamsDiv && playersDiv) {
  async function getTeams() {
    const response = await fetch('http://localhost:3000/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const teams = await response.json();
    teams.forEach((team) => {
        displayTeam('team');
      });
    }
  async function getPlayers() {
    
    console.log("Getting players...");

    const response = await fetch('http://localhost:3000/players', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const players = await response.json();

    console.log("API Players:", players);
    
    displayPlayers(players);
  }

  function displayTeam(team) {
    const teamHTML = `
      <div class="team">
        <h2>${team.name}</h2>
        <button onclick="deleteTeam(${team.id})">Delete</button>
      </div>
    `;
    teamsDiv.innerHTML += teamHTML;
  }
  function displayTeams(teams) {
    teamsDiv.innerHTML = '';
    teams.forEach((team) => {
      displayTeam(team);
    });
  }
  
  //ANCHOR - TODO need a method for creating a player or a team
 
  async function onCreateMovieClick() {
    const response = await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Test', genreId: 1 })
    });
    const newlyCreatedItem = await response.json();
    lastCreatedItem = newlyCreatedItem;
}

  //ENDHER
  
  async function deletePlayer(id) {
    
    await fetch(`http://localhost:3000/players/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    }

  function displayPlayer(player) {
console.log("Display player...", player);


    const playerHTML = `
      <div id="player-${player.id}" class="player">
        <h2>${player.name}</h2>
        <button type="text" id="delete-button-${player.id}">
         Delete
        </button>
      </div>
    `;

// onclick="() => deletePlayer(${player.id})"

    

    playersDiv.innerHTML += playerHTML;
    document.getElementById(`delete-button-${('player.id')}`).addEventListener("click", (event) => {
      event.preventDefault();
    
      console.log("Clicking to delete a player...", player.id);

      deletePlayer(player.id) //Takes in the player id as a argument
    });
  }

  function displayPlayers(players) {
    playersDiv.innerHTML = '';
    players.forEach((player) => {
      displayPlayer(player);
    });
  }


  async function deleteTeam(id) {
    try {
      await fetch(`http://localhost:3000/teams/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await getTeams();
      
      // Refresh teams list
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  }
  