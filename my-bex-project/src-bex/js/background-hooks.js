// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks

export default function attachBackgroundHooks (bridge /* , allActiveConnections */) {
  var focusMode = {"twitter": true, "linkedIn": true};
  var currentURL = null;
  chrome.commands.onCommand.addListener(function(command) {
    if (currentURL == "https://twitter.com/home") {
      sendStatus(focusMode, "twitter", bridge)
    } else if (currentURL == "https://www.linkedin.com/feed/") {
      sendStatus(focusMode, "linkedIn", bridge)
    }
  });


  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    currentURL = tab.url;
  });
}


function sendStatus(focusMode, webPage, bridge){
  if (focusMode[webPage]){
    bridge.send("focus")
  }else{
    bridge.send("un-focus")
  }
  focusMode[webPage] = !focusMode[webPage]
}
