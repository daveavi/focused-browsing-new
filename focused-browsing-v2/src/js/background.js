var focusMode = {"twitter": {"focus": true, "initialized": false}, "linkedin":{"focus": true, "initialized": false} };

var currentURL;
var port;

chrome.runtime.onConnect.addListener(function (connectionPort) {
    console.assert(connectionPort.name == "Focused Browsing");
    port = connectionPort;
    console.log(connectionPort.name)

    port.onMessage.addListener(function (msg) {
      currentURL = msg.url
      if (currentURL === "https://twitter.com/home") {
          console.log("here about to initalize twitter")
          // initializeFocus("twitter")
          
      } else if (currentURL === "https://www.linkedin.com/feed/") {
          // initializeFocus("linkedin")
          console.log("here about to initalize linkedIn")
      }
      registerCommandListener()
    });
    
});



function registerCommandListener() {
  console.log("registering command listener")
  function toggleFocusListener(command) {
      if (currentURL === "https://twitter.com/home") {
        console.log("sending message to twitter")
        // toggleFocus("twitter", bridge)
      } else if (currentURL === "https://www.linkedin.com/feed/") {
        console.log("sending message to linkedin")
        // toggleFocus("linkedin", bridge)
      }
    });
  }

  chrome.commands.onCommand.addListener(toggleFocusListener);
}






  
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        console.log("got message from vue button")
        //send focus to content
        // sendFocus()
        //change state 

        sendResponse({farewell: "goodbye"});
    }
  );




function toggleFocus(webPage, bridge) {
    if (!focusMode[webPage].focus) {
      sendFocus(webPage,bridge)
    } else {
      sendUnFocus(webPage,bridge)
    }
    focusMode[webPage].focus = !focusMode[webPage].focus
}
  
  
function sendFocus(webPage){

}
  
function sendUnFocus(webPage){
    chrome.runtime.sendMessage('un-focus', (response) => {
        // 3. Got an asynchronous response with the data from the background
        console.log('focus sent')
    });
}
  
  
function initializeFocus(webPage){
    var initializeFocus = !focusMode[webPage].initialized || focusMode[webPage].focus
    if(initializeFocus){
      console.log("initializing focus")
      sendFocus(webPage)
      console.log(focusMode)
    }
  
    if (!focusMode[webPage].initialized){
      focusMode[webPage].initialized = !focusMode[webPage].initialized
      console.log(focusMode)
    }
}