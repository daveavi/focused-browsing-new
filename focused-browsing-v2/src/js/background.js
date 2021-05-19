var focusMode = {"twitter": {"focus": true, "initialized": false}, "linkedin":{"focus": true, "initialized": false} };

var activeURL;
var port;


chrome.runtime.onConnect.addListener(function (connectionPort) {
    console.log(connectionPort)
    console.assert(connectionPort.name == "Focused Browsing");
    port = connectionPort;
    console.log(connectionPort.name)

    port.onMessage.addListener(function (msg) {
      console.log("here")
      console.log(msg)
      activeURL = msg.url
      if (activeURL === "https://twitter.com/" || activeURL === "https://twitter.com/home") {
          console.log("here about to initalize twitter")
          initializeFocus("twitter")
          
      } else if (activeURL === "https://www.linkedin.com/feed/") {
          initializeFocus("linkedin")
          console.log("here about to initalize linkedIn")
      }
    });    
});

// chrome.tabs.onActivated.addListener(function(activeInfo, tab) {
//   chrome.tabs.getSelected(null,function(tab) {
//     activeURL = tab.url;
//     console.log("activeURL is: "+ activeURL)
//   });
// });


chrome.commands.onCommand.addListener(toggleFocusListener);

function toggleFocusListener(command,tab) {
  console.log(command)
  if (activeURL === "https://twitter.com/home" || activeURL === "https://twitter.com/") {
    console.log("sending message to twitter")
    toggleFocus("twitter")
  } else if (activeURL === "https://www.linkedin.com/feed/") {
    console.log("sending message to linkedin")
    toggleFocus("linkedin")
  }
}

// function tabMonitor(){
//   if(currentURL.includes("twitter.com")){
//       if(focusMode["twitter"].focus){
//         if (currentURL === "https://twitter.com/home") {
//           console.log("listener is listening to twitter page")
//           sendStatus("twitter","focus", "tab")
//         }else{
//           console.log("sending removeIframe")
//           sendStatus("twitter","focus","removeIframe")
//         }
//       }
//   } else if(currentURL.includes("linkedin.com")) {
//     if(focusMode["linkedin"].focus){
//       if (currentURL === "https://www.linkedin.com/feed/") {
//         console.log("listener is listening to linkedin page")
//         sendStatus("linkedin","focus", "tab")
//       }else{
//         sendStatus("linkedin","focus","removeIframe")
//       }
//     }
//   }
// }






  
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    let webPage = activeURL.includes("twitter.com") ? "twitter" : "linkedin"
    if (request.status == "focus"){
      toggleFocus(webPage)
    }
    sendResponse({enabled: "focus"})
    return true

  }
);






function toggleFocus(webPage) {
    if (!focusMode[webPage].focus) {
      console.log("focus mode on " + webPage)
      sendStatus(webPage,"focus",  "toggle")
    } else {
      console.log("unfocus mode on " + webPage)
      sendStatus(webPage,"unfocus", "toggle")
    }
    focusMode[webPage].focus = !focusMode[webPage].focus
}
  
  
function sendStatus(webPage,status,method){
  try{
    console.log("sending status " + status +" on "+webPage)
    // port.postMessage({"status":status, "method": method})

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {"status":status, "method": method}, function(response) {
        console.log(response.farewell);
      });
    });

  }catch(err){
    console.log("background script hasn't initialized port")
  }
}
  

  
  
function initializeFocus(webPage){
    var initializeFocus = !focusMode[webPage].initialized || focusMode[webPage].focus
    if(initializeFocus){
      console.log("initializing focus")
      sendStatus(webPage,"focus","initial")
      console.log(focusMode)
    }
  
    if (!focusMode[webPage].initialized){
      focusMode[webPage].initialized = !focusMode[webPage].initialized
      console.log(focusMode)
    }
}