const TWITTER_FEED_FRAME_HEIGHT = "4000px";
const TWITTER_FEED_FRAME_WIDTH = "598px";

const TWITTER_PANEL_FRAME_HEIGHT = "4000px";
const TWITTER_PANEL_FRAME_WIDTH = "350px";

const IFRAME_ClASS = "focus-card";


import TwitterStrategy from './siteStrategy/TwitterStrategy'
import LinkedInStrategy from './siteStrategy/LinkedInStrategy'

var port; 
var twitterStrategy, linkedInStrategy;




;(function () {
  port = chrome.runtime.connect({name: "Focused Browsing"});
  port.onMessage.addListener(focusListener)



  twitterStrategy = new TwitterStrategy()
  // linkedInStrategy = new LinkedInStrategy()
})()

function focusListener(msg) {
  console.log(msg)
  let status = msg.status
  let method = msg.method
  let url = msg.url
  if (status == "focus"){
     if (url.includes("twitter")) {
          twitterStrategy.clearPanelElements()
          if(method == "initial"){
             twitterStrategy.focusTwitter();
            //  twitterStrategy.injectCards("home")
          }else if(method == "hidePanels"){
             twitterStrategy.focusTwitterPanel();
          }else{
             twitterStrategy.toggleTwitterHomeDistractions(true);
            //  twitterStrategy.injectCards("home")
          }
      } else if (url.includes("linkedin")){
          console.log("about to focus on linkedin");
          linkedInStrategy.focusLinkedIn()
      }
  }else if(msg.status == "unfocus"){
      if (url.includes("twitter")) {
          if(url.includes("/home")){
            console.log("about to un-focus on Twitter");
            removeCards()
            twitterStrategy.toggleTwitterHomeDistractions(false)
          }else{
            twitterStrategy.hideTwitterPanel(false)
          }
          removeCards()
      } else if (url.includes("linkedin")) {
          console.log("about to un-focus on linkedin");
          linkedInStrategy.toggleLinkedInHomeDistractions(false)
      }
  }
}




function removeCards(){
  try{
    let cards = document.getElementsByClassName(IFRAME_ClASS)

    Array.prototype.forEach.call(cards, function(el) {
      // Do stuff here
      el.remove()
    });
  }catch(err){
    console.log(err)
    console.log("the iframe is not on the screen")
  }
}
  
