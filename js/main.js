
// add a click listener for the button
$('button#myWordButton').click(function(event) {
  event.preventDefault();
  word = $('input#myWord').val();
  if (word.length > 0) {
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'http://words.bighugelabs.com/api/2/15201a528d9b24197467097641775820/' + word + '/json',
      success: function(reponse) {
        displayResults(word, reponse);
      }
    });
  } else {
    alert("You must enter a word!");
  }
});


// process JSON and add the results to the page
function displayResults(originalWord, reponse) {
  $('div#results').empty();
  $('input#myWord').val('');
  $('h3#wordHeader').text('Results for: ' + originalWord);
  
  // http://api.jquery.com/jquery.each/
  $.each(reponse, function(partOfSpeech, wordList) {

    // display part of speech as a header
    $('div#results').append('<h4>' + partOfSpeech + '</h4>');

     // create a list of words based on type
    if (wordList.syn !== undefined) {
      createList('synonyms', wordList.syn);
    }
    if (wordList.ant !== undefined) {
      createList('antonyms', wordList.ant);
    }
    if (wordList.rel !== undefined) {
      createList('related terms', wordList.rel);
    }
    if (wordList.sim !== undefined) {
      createList('similar terms', wordList.sim);
    }
  });
}


function createList(data, words) {
  $('div#results').append('<h5>' + data + '</h5>');
  $('div#results').append('<ul id="' + data + '"></ul>');
  
  words.forEach(function(el, i, arr) {
    $('ul#' + data).append('<li>' + el + '</li>');
  });
}
