$(document).ready(function() {

  function jsonThen(func) {
    return function (response) {
    response.json().then(func);
    }
  }

  function myMethod(json) {
    console.log(json.resultsPage.results.artist[0].id);
  }

  $('#search-btn').click(function() {
    var inputValue = $('#search-text').val();
    console.log(inputValue);
    var setValue = `https://api.songkick.com/api/3.0/search/artists.json?apikey=XFK6hX8iZ4LjPg6l&query="${inputValue}"`;
    console.log(setValue);
    fetch(setValue).then(jsonThen(myMethod));
  });

});
