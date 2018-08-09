$(document).ready(function() {

  function jsonThen(func) {
    return function (response) {
    response.json().then(func);
    }
  }

  function myMethod(json) {
     var artistEvent = json.resultsPage.results.event;
     artistEvent.forEach( name => {
       name === displayName;
       console.log(displayName);
     });
   }

  $('#search-btn').click(function() {
    var inputValue = $('#search-text').val();
    var setValue = `https://api.songkick.com/api/3.0/search/artists.json?apikey=XFK6hX8iZ4LjPg6l&query="${inputValue}"`;
    fetch(setValue).then(jsonThen(searchShow));
  });

  function searchShow(json) {
    var artist_id = json.resultsPage.results.artist[0].id;
    var setId = `https://api.songkick.com/api/3.0/artists/${artist_id}/calendar.json?apikey=XFK6hX8iZ4LjPg6l`;
    fetch(setId).then(jsonThen(myMethod));
  }

  // function myFunction(json) {
  //   var artist_id = json.resultsPage.results.artist[0].id;
  //   seachEvent(artist_id);
  //   console.log(json);
  // }

});
