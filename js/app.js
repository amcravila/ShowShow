$(document).ready(function() {

  function response(func) {
    return function(response) {
    response.json().then(func);
    }
  }

  function searchShow(json) {
    console.log(json);
    var artistEvents = json.resultsPage.results.event;
    $("#search-text").val("");
    $("#show-show").empty();
    $("#artist-status").empty();
    if (artistEvents !== undefined) {
      artistEvents.forEach((object, index, show) => {
        var showPerformer = show[index].performance[0].artist.displayName;
        var showLocation = show[index].venue.displayName;
        var showCity = show[index].location.city;
        var showDetails = `<p class=""> ${showPerformer} </p>
                           <p class=""> ${showLocation} </p>
                           <p class=""> ${showCity} </p>
        `;
        var showDay = moment(show[index].start.date).locale("pt-BR").format("D");
        var showMonth = moment(show[index].start.date).locale("pt-BR").format("MMM");
        var showYear = moment(show[index].start.date).locale("pt-BR").format("YYYY");
        var showDate = `<p class=""> ${showDay} </p>
                        <p class=""> ${showMonth} </p>
                        <p class=""> ${showYear} </p>
        `;
        if (showDay !== "Invalid date" && showMonth !== "Invalid date" && showYear !== "Invalid date") {
          $("#show-show").append(`
            <li>
              <div class=""> ${showDate} </div>
              <div class=""> ${showDetails} </div>
            </li>
          `);
        }
      });
    } else {
      $("#artist-status").append(`<p class=""> Artista fora de turnê </p>`);
    }
  }

  function setAvatar(avatar) {
    var artistAvatar = avatar;
    $("#artist-avatar").empty();
    $("#artist-avatar").append(`
      <div class="" style="background-image: url('${artistAvatar}'); height:20vh"></div>
    `);
  }

  function setId(json) {
    var artistId = json.resultsPage.results.artist[0].id;
    var setId = `https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=XFK6hX8iZ4LjPg6l`;
    var setIdImg = `https://images.sk-static.com/images/media/profile_images/artists/${artistId}/huge_avatar`;
    fetch(setId).then(response(searchShow));
    setAvatar(setIdImg);
  }

  $("#search-btn").click(function(event) {
    event.preventDefault();
    var artistName = $("#search-text").val();
    var setName = `https://api.songkick.com/api/3.0/search/artists.json?apikey=XFK6hX8iZ4LjPg6l&query="${artistName}"`;
    fetch(setName).then(response(setId));
  });

});
