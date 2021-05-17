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
          initializeFocus("twitter")
          
      } else if (currentURL === "https://www.linkedin.com/feed/") {
          initializeFocus("linkedin")
          console.log("here about to initalize linkedIn")
      }
    });
    
});


function tabListener(tabId, changeInfo, tab){
  currentURL = tab.url
  if (currentURL === "https://twitter.com/home") {
    if(focusMode["twitter"].focus){
      sendFocus("twitter")
    }
  } else if (currentURL === "https://www.linkedin.com/feed/") {
    if(focusMode["linkedin"].focus){
      sendFocus("linkedin")
    }
  }


}

chrome.tabs.onUpdated.addListener(tabListener);
chrome.commands.onCommand.addListener(toggleFocusListener);

function toggleFocusListener(command) {
  if (currentURL === "https://twitter.com/home") {
    console.log("sending message to twitter")
    toggleFocus("twitter")
  } else if (currentURL === "https://www.linkedin.com/feed/") {
    console.log("sending message to linkedin")
    toggleFocus("linkedin")
  }
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






function toggleFocus(webPage) {
    if (!focusMode[webPage].focus) {
      sendFocus(webPage)
    } else {
      sendUnFocus(webPage)
    }
    focusMode[webPage].focus = !focusMode[webPage].focus
}
  
  
function sendFocus(webPage){
    port.postMessage({"status":'focus'})
}
  
function sendUnFocus(webPage){
    port.postMessage({"status":'unfocus'})
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