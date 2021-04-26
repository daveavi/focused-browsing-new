// Background code goes here

chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
});