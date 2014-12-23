var wordZone = {

  inputClick: function () {
    var $searchButton = $('button#myWordButton');
    var $searchField = $('input#myWord');

    $searchButton.click(function(event) {
      event.preventDefault();
      $searchField.prop("disabled",true);
      $searchButton.attr("disabled",true).text("Searching....");
      word = $searchField.val();
      if (word.length > 0) {
        $.ajax( {
          type: 'GET',
          dataType: 'jsonp',
          url: 'http://words.bighugelabs.com/api/2/15201a528d9b24197467097641775820/' + word + '/json',
          success: function(reponse) {
            wordZone.displayResults(word, reponse);
          }
        });
      } 
      else {
        alert("You must enter a word!");
      }
      //error message goes here//
    });
  },
    
  displayResults : function (originalWord, reponse) {
    $('div#results').empty();
    $('input#myWord').text('');
    $('h3#wordHeader').text('Results for : ' + originalWord);
    
    // http://api.jquery.com/jquery.each/
    $.each(reponse, function(partOfSpeech, wordList) {

      // display part of speech as a header
      $('div#results').append('<h4>' + partOfSpeech + '</h4>');

       // create a list of words based on type
      if (wordList.syn !== undefined) {
        wordZone.createList('Synonyms', wordList.syn);
      }
      if (wordList.ant !== undefined) {
        wordZone.createList('Antonyms', wordList.ant);
      }
      if (wordList.rel !== undefined) {
        wordZone.createList('Related terms', wordList.rel);
      }
      if (wordList.sim !== undefined) {
        wordZone.createList('Similar terms', wordList.sim);
      }
    });
    // $searchField.prop("disabled",false);
    // $searchButton.attr("disabled",false).text("Search");
  },
  
  createList : function (data, words) {
    $('div#results').append('<h5>' + data + '</h5>');
  $('div#results').append('<ul id="' + data + '"></ul>');
  
  words.forEach(function(data2) {
    $('ul#' + data).append('<li>' + data2 + ',</li>');
    });
  }
};
wordZone.inputClick();
