const loadTeams = () =>{
    const searchField = document.getElementById('search');
    const searchValue = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTeams(data.teams));

    // clear search filed
    searchField.value='';
}
const displayTeams = teams =>{
    const teamsContainer = document.getElementById('teams');
    teams.forEach(team => {
        const div = document.createElement('div');
        div.classList.add('col-4');
        div.innerHTML = `
          <div id="team-box" onclick="teamDetails(${team.idTeam})" class="border border-primary py-3" style="width:80%">
            <img class="w-50 mx-auto d-block" src='${team.strTeamBadge}' />
            <h4 class="text-center text-danger mt-4">${team.strTeam}</h4>
            <a class="text-center d-block" href="">View details</a>
          </div>
        `

        teamsContainer.appendChild(div);
    });
}
const teamDetails = id =>{
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTeamDetails(data.teams[0]));
    
}
const displayTeamDetails= team =>{
    const teamDetails = document.getElementById('team-details');
    teamDetails.innerHTML = `
    <div class="w-50 mx-auto">
                <img class="w-25 d-block mx-auto mb-4" src="${team.strTeamBadge}"
                        alt="">
                    <p>${team.name}</p>
                <div class="row">
                    <div class="col-md-4">
                        <p><strong>Team Jersey : </strong></p>
                        <img class="mb-3 img-fluid" src="${team.strTeamJersey}" style="width:100px">
                    </div>
                    <div class="col-md-8">
                        <img class="img-fluid" src="${team.strTeamBanner}" style="height:200px" alt="">
                    </div>
                </div>
                <div class="mt-5">
                    <p><strong>Short Name : </strong>${team.strTeamShort}</p>
                    <p><strong>Full Name : </strong>${team.strAlternate}</p>
                    <p><strong>Stablished : </strong>${team.intFormedYear}</p>
                    <p><strong>Stadium : </strong>${team.strStadium}</p>
                    <p><strong>Website : </strong><a href="${team.strWebsite}">${team.strWebsite}</a></p>
                    <p><strong>Facebook : </strong><a href="${team.strFacebook}">${team.strFacebook}</a></p>
                    <p><strong>Youtube : </strong><a href="${team.strYoutube}">${team.strYoutube}</a></p>
                </div>
            </div>
    
    
    `
}