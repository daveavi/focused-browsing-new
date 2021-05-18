var TWITTER_FEED_CLASS = "";
var TWITTER_PANEL_CLASS = "";

const FEED_CONTAINER_CLASS_NAME = "section[aria-labelledby^=accessible-list]";
const NEWS_FEED_CLASSNAME = "core-rail";
const SHARED_NEWS_CLASSNAME = "ad-banner-container artdeco-card ember-view";
const MAIN_CONTAINER_CLASSNAME = "neptune-grid three-column ghost-animate-in";
const LINKEDIN_NEWS = "news-module pv3 ember-view";

const VISIBILITY_HIDDEN = "hidden";
const VISIBILITY_VISIBLE = "visible";

const HOME_PAGE_CLASS = "self-focused ember-view";

var appIframe;
const DEFAULT_FRAME_HEIGHT = "100px";
const DEFAULT_FRAME_WIDTH = "120px";
const IFRAME_ID = "focus-card"
var firstURLConnection = window.location.toString()

var initialLoad = false
const port = chrome.runtime.connect({ name: "Focused Browsing"});
port.postMessage({url: firstURLConnection});

port.onMessage.addListener(function (msg) {
    console.log(msg)
    let status = msg.status
    let method = msg.method
    if (status == "focus"){
        if(method == "removeIframe"){
            removeIframe()
        }else if (firstURLConnection.includes("twitter")) {
            if(method == "initial"){
                focusTwitter();
            }else{
                toggleTwitterDistractions(true);
            }
            startIframe();
        } else if (firstURLConnection.includes("linkedin")){
            console.log("about to focus on linkedin");
            startIframe();
            hideLinkedIn(true);
        }
    }else if(msg.status == "unfocus"){
        if (firstURLConnection.includes("twitter")) {
            console.log("about to un-focus on Twitter");
            toggleTwitterDistractions(false);
        } else if (firstURLConnection.includes("linkedin")) {
            console.log("about to un-focus on linkedin");
            hideLinkedIn(false);
        }
    }
});












;(function () {
    console.log("welcome to the content script")
    initIframe()
})()

function initIframe() {
    appIframe = document.createElement("iframe");
    console.log(appIframe);
    //I am appending it to the body just to test it out for now, to see if the code is being rendered on focus right away
}

function startIframe() {
    appIframe.src = chrome.runtime.getURL("www/card.html");
    console.log(appIframe);
}

function injectIframe() {
    appIframe.width = DEFAULT_FRAME_WIDTH;
    appIframe.height = DEFAULT_FRAME_HEIGHT;
    appIframe.id = IFRAME_ID
    // document.body.style.paddingLeft = width;
    Object.assign(appIframe.style, {
        position: "fixed",
        border: "none",
        zIndex: "10000",
    });
    document.body.prepend(appIframe);
    console.log(appIframe);
}

function removeIframe(){
    document.getElementById(IFRAME_ID).remove()
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
  
  var areDistractionsHidden = false;
  function toggleTwitterDistractions(shouldHide) {
    console.log("here we are in toggle twitter distraction")
    console.log("should hide is: " + shouldHide)
    try {
      if (shouldHide) {
        document.getElementsByClassName(
          TWITTER_FEED_CLASS
        )[0].style.visibility = VISIBILITY_HIDDEN;
        document.getElementsByClassName(
          TWITTER_PANEL_CLASS
        )[1].style.visibility = VISIBILITY_HIDDEN;
        injectIframe();
        areDistractionsHidden = true;
      } else {
        console.log("here is our un focus block of code")
        document.getElementsByClassName(
          TWITTER_FEED_CLASS
        )[0].style.visibility = VISIBILITY_VISIBLE;
        document.getElementsByClassName(
          TWITTER_PANEL_CLASS
        )[1].style.visibility = VISIBILITY_VISIBLE;
        areDistractionsHidden = false;
        removeIframe()
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  var intervalId;
  function tryBlockingTwitterHome() {
    console.log("we are trying to block twitter home")
    if (areDistractionsHidden) {
      console.log("we can clear the interval")
      console.log(intervalId)
      clearInterval(intervalId);
      return
    } else {
      try {
        if (homePageTwitterHasLoaded()) {
            console.log("here in blocking twitter")
            toggleTwitterDistractions(true);
        }
      } catch (err) {
        console.log("Feed hasn't been loaded yet");
      }
    }
  }
  
  function focusTwitter() {
    console.log("setting interval to block twitter")
    if (initialLoad) {
      intervalId = setInterval(tryBlockingTwitterHome, 1000);
      initialLoad = false;
    } else {
      intervalId = setInterval(tryBlockingTwitterHome, 100);
    }
  }
  
  function homePageTwitterHasLoaded() {
    return panelHasLoaded() && feedHasLoaded();
  }
  
  function panelHasLoaded() {
    TWITTER_FEED_CLASS = getTwitterPanelClassName();
    
  
    return TWITTER_FEED_CLASS;
  }
  
  function feedHasLoaded() {
    TWITTER_PANEL_CLASS = getTwitterFeedClassName();
    return TWITTER_PANEL_CLASS;
  }
  
  function getTwitterFeedClassName() {
    let feed = document.querySelectorAll('[role="main"]')[0].children[0].children[0]
    .children[0].children[0].children[0].children[3]
  
    if(feed != null){
      return feed.className
    }else{
      return false
    }
  
  }
  
  function getTwitterPanelClassName() {
    let panel = document.querySelectorAll('[role="main"]')[0].children[0].children[0]
    .children[0].children[1].children[0].children[1].children[0].children[0]
    .children[0].children[2]
  
    if(panel != null){
      return panel.className
    }else{
      return false
    }
  }


