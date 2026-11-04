const searchInput = document.getElementById("pokemon-search");
const results = document.getElementById("search-results");
const teamDisplay = document.getElementById("pokemon-spot");
const team = [];
const analysisDisplay = document.getElementById("analysis");
function renderTeam()
{
    teamDisplay.textContent = "";

    team.forEach(function(member, index)
    {
        const card = document.createElement("div");
        card.style.cursor = "pointer";

        card.addEventListener("click", function()
        {
            team.splice(index, 1);
            renderTeam();
            renderAnalysis();
        });

        const img = document.createElement("img");
        img.src = "Pokemon/" + member.id + ".png";
        img.alt = member.name;

        const label = document.createElement("p");
        label.textContent = member.name;

        card.appendChild(img);
        card.appendChild(label);
        teamDisplay.appendChild(card);
    });
}
function renderAnalysis()
{
    analysisDisplay.textContent = "";

    const allTypes = Object.keys(typeChart);

    allTypes.forEach(function(attackType)
    {
        let weakCount = 0;
        let resistCount = 0;

        team.forEach(function(member)
        {
            const effectiveness = getEffectiveness(attackType, member.types);
            if (effectiveness > 1)
            {
                weakCount = weakCount + 1;
            }
            else if (effectiveness < 1)
                {
                   resistCount = weakCount + 1; 
                }
        });

        const line = document.createElement("p");
        line.textContent = attackType + ": " + weakCount + " weak " + resistCount + " resist";
        if (weakCount > resistCount)
            {
                line.style.color = "#ff6b6b";
            }
            else if (resistCount > weakCount)
            {
                line.style.color = "#6bdc8b";
            }
        analysisDisplay.appendChild(line);
    });
}
searchInput.addEventListener("input", function()
{
    const searchText = searchInput.value.toLowerCase();

    const matches = pokemon.filter(function(p)
    {
        return p.name.toLowerCase().includes(searchText);
    });

    results.textContent = "";

    if (searchText === "")
    {
        results.style.display = "none";
        return;
    }

    results.style.display = "flex";

    matches.forEach(function(p)
    {
        const button = document.createElement("button");
        button.textContent = p.name;

        button.addEventListener("click", function()
        {
            if (team.length >= 6)
            {
                return;
            }

            team.push(p);
            renderTeam();
            renderAnalysis();
        });

        results.appendChild(button);
    });
});