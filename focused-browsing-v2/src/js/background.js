var focusMode = {"twitter": {"focus": true, "initialized": false}, "linkedin":{"focus": true, "initialized": false} };

var currentURL;
var port;

var isTabListenerRegistered = false 

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

      // registerTabsListener()
    });
    registerTabsListener()
    
});


function registerTabsListener(){
  console.log(`INFO: Is Tab listener registered? : ${isTabListenerRegistered}`)

  if (isTabListenerRegistered) {
    console.log("WARNING: Tab listener already registered, skipping")
    return
  }


  function tabListener(tabId, changeInfo, tab){
    console.log(tabId)
    console.log(changeInfo)
    currentURL = tab.url
    if(changeInfo && changeInfo.status === "complete" && isTabListenerRegistered){
      if (currentURL === "https://twitter.com/home") {
        if(focusMode["twitter"].focus){
          console.log("listener is listening to twitter page")
          sendStatus("twitter","focus")
        }
      } else if (currentURL === "https://www.linkedin.com/feed/") {
        if(focusMode["linkedin"].focus){
          console.log("listener is listening to linkedin page")
          sendStatus("linkedin","focus")
        }
      }


    }
  }
  chrome.tabs.onUpdated.addListener(tabListener);
  isTabListenerRegistered = true
  console.log("SUCCESS: Tab listener registered")
}


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
      console.log("focus mode on " + webPage)
      sendStatus(webPage,"focus")
    } else {
      console.log("unfocus mode on " + webPage)
      sendStatus(webPage,"unfocus")
    }
    focusMode[webPage].focus = !focusMode[webPage].focus
}
  
  
function sendStatus(webPage,status){
  try{
    console.log("sending status " + status +" on "+webPage)
    port.postMessage({"status":status})
  }catch(err){
    console.log("background script hasn't initialized port")
  }
}
  

  
  
function initializeFocus(webPage){
    var initializeFocus = !focusMode[webPage].initialized || focusMode[webPage].focus
    if(initializeFocus){
      console.log("initializing focus")
      sendStatus(webPage,"focus")
      console.log(focusMode)
    }
  
    if (!focusMode[webPage].initialized){
      focusMode[webPage].initialized = !focusMode[webPage].initialized
      console.log(focusMode)
    }
}