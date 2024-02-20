document.getElementById('checkButton').addEventListener('click', function() {
  var text = document.getElementById('textInput').value;
  
  // Call the LanguageTool API to check grammar
  fetch('https://api.languagetool.org/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(text)}&language=en-US`,
  })
  .then(response => response.json())
  .then(data => {
    // Display the grammar checking results
    if (data.matches && data.matches.length > 0) {
      var results = data.matches.map(match => match.message).join('<br>');
      document.getElementById('results').innerHTML = results;
    } else {
      document.getElementById('results').innerHTML = "No grammar mistakes found!";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = "Error: Unable to check grammar.";
  });
});
