
function highlight_pairs(words, text) {
  for (var word in words) {
    for (var i = 1; i < words[word].length; i++) {
      var first_index = words[word][i-1];
      var second_index = words[word][i];
      if (second_index == undefined || word.length <= 3)  {
        continue;
      }
      if (Math.abs(second_index - first_index) < 100) {
        text.setBackgroundColor(first_index, first_index + word.length-1, '#FFFF00');
        text.setBackgroundColor(second_index, second_index + word.length-1, '#FFFF00') 
      }
    }
  }
}


function onOpen(e) {
 var body = DocumentApp.getActiveDocument().getBody();

 // Use editAsText to obtain a single text element containing
 // all the characters in the document.
 var textBody = body.editAsText();
 var text = textBody.getText().split(" ");
  
  var words = {};
  var body_cursor = 0
  for (var i = 0; i < text.length; i++) {
    if (text[i] in words) {
      words[text[i]].push(body_cursor);
    } else {
      words[text[i]] = [body_cursor];
    }
    body_cursor = body_cursor + text[i].length + 1;
  }
  Logger.log(words);
  highlight_pairs(words, textBody);
}
