const HOME_PAGE_CLASS = "self-focused ember-view";


const DEFAULT_FRAME_HEIGHT = "100px";
const DEFAULT_FRAME_WIDTH = "120px";
const IFRAME_ID = "focus-card"


import TwitterStrategy from './siteStrategy/TwitterStrategy'
import LinkedInStrategy from './siteStrategy/LinkedInStrategy'

var port; 
var twitterStrategy, linkedInStrategy;




;(function () {
  port = chrome.runtime.connect({name: "Focused Browsing"});
  port.onMessage.addListener(focusListener)
  let appIframe = initIframe()
  twitterStrategy = new TwitterStrategy(appIframe)
  linkedInStrategy = new LinkedInStrategy(appIframe)
})()

function focusListener(msg) {
  console.log(msg)
  let status = msg.status
  let method = msg.method
  let url = msg.url
  if (status == "focus"){
     if (url.includes("twitter")) {
          if(method == "initial"){
             twitterStrategy.focusTwitter();
          }else if(method == "hidePanels"){
             twitterStrategy.focusTwitterPanel();
          }else{
             twitterStrategy.toggleTwitterHomeDistractions(true);
          }
      } else if (url.includes("linkedin")){
          console.log("about to focus on linkedin");
          linkedInStrategy.focusLinkedIn()
      }
  }else if(msg.status == "unfocus"){
      if (url.includes("twitter")) {
          if(url.includes("/home")){
            console.log("about to un-focus on Twitter");
            twitterStrategy.toggleTwitterHomeDistractions(false)
            removeIframe()
          }else{
            twitterStrategy.hideTwitterPanel(false)
          }
      } else if (url.includes("linkedin")) {
          console.log("about to un-focus on linkedin");
          linkedInStrategy.toggleLinkedInHomeDistractions(false)
      }
  }
}



function initIframe() {
    let appIframe = document.createElement("iframe");
    appIframe.width = DEFAULT_FRAME_WIDTH;
    appIframe.height = DEFAULT_FRAME_HEIGHT;
    appIframe.id = IFRAME_ID;

    Object.assign(appIframe.style, {
        position: "fixed",
        border: "none",
    });
    appIframe.src = chrome.runtime.getURL("www/card.html");
    return appIframe
}


function removeIframe(){
  try{
    document.getElementById(IFRAME_ID).remove()
  }catch(err){
    console.log("the iframe is not on the screen")
  }
   
}


function hideLinkedIn(hide) {
    console.log("here in this linkedIn function")
    try {
      if (hide) {
        console.log("about to hide linkedIn feed")
        document.getElementsByClassName(
          HOME_PAGE_CLASS
        )[0].style.visibility = VISIBILITY_HIDDEN;
        injectIframe()
      } else {
        console.log("about to make linkedIn feed visible")
        document.getElementsByClassName(
          HOME_PAGE_CLASS
        )[0].style.visibility = VISIBILITY_VISIBLE;
        removeIframe()
      }
    } catch (err) {
      console.log(err);
    }
}
  
