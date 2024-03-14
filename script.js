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
      data.matches.reverse().forEach(match => {
        text = text.substring(0, match.offset) + match.replacements[0].value + text.substring(match.offset + match.length);
      });
      document.getElementById('results').innerHTML = "Grammar mistakes fixed!";
      document.getElementById('textInput').value = text;
    } else {
      document.getElementById('results').innerHTML = "No grammar mistakes found!";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = "Error: Unable to check grammar.";
  });
});
