const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function showTeam(card) {
    let team = card.querySelector(".team");

    if (team.style.display === "block") {
        team.style.display = "none";
    } else {
        team.style.display = "block";
    }
}

function renderLeaders() {
  const container = document.querySelector(".gymLeader");
  container.innerHTML = gymLeaders.map(leader => `
    <div class="leader-card" onclick="showTeam(this)">
      <img src="${leader.image}" alt="${leader.name}">
      <div class="stylegl ${leader.specialty}">
        <h2>${leader.name}<br>Specialty: ${capitalize(leader.specialty)}</h2>
        <div class="team">
          ${leader.team.map(p => `
            <img src="Pokemon/${p.id}.png" alt="${p.name}">
            <p>${p.name}<br>Level ${p.level}<br>Type: ${p.types.map(capitalize).join("/")}</p>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

renderLeaders();