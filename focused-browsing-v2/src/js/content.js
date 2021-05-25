var TWITTER_FEED_CLASS = "";
var TWITTER_PANEL_CLASS = "";

const FEED_CONTAINER_CLASS_NAME = "section[aria-labelledby^=accessible-list]"
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
var port; 

var TWITTER_FEED_PARENT_NODE;
var TWITTER_FEED_CHILD_NODE; 
var TOPICS_TO_FOLLOW = null;

var PANEL_ELEMENTS = [] 

  
var homePageTwitterHidden = false;
var panelPageTwitterHidden = false

function focusListener(msg) {
  console.log(msg)
  let status = msg.status
  let method = msg.method
  let url = msg.url
  if (status == "focus"){
     if (url.includes("twitter")) {
          if(method == "initial"){
              focusTwitter();
              panelPageTwitterHidden = false;
          }else if(method == "hidePanels"){
              PANEL_ELEMENTS = [] 
              focusTwitterPanel();
              homePageTwitterHidden = false;
          }else{
              toggleTwitterDistractions(true);
              panelPageTwitterHidden = false;
          }
          startIframe();
      } else if (url.includes("linkedin")){
          console.log("about to focus on linkedin");
          startIframe();
          hideLinkedIn(true);
      }
  }else if(msg.status == "unfocus"){
      if (url.includes("twitter")) {
          console.log("about to un-focus on Twitter");
          toggleTwitterDistractions(false);
      } else if (url.includes("linkedin")) {
          console.log("about to un-focus on linkedin");
          hideLinkedIn(false);
      }
  }
}

;(function () {
    port = chrome.runtime.connect({name: "Focused Browsing"});
    console.log(firstURLConnection)
    port.postMessage({url: firstURLConnection});
    port.onMessage.addListener(focusListener)
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
    
    TWITTER_FEED_PARENT_NODE.append(appIframe)
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
  
var homePageTwitterHidden = false;
function toggleTwitterDistractions(shouldHide) {
  console.log("here we are in toggle twitter distraction")
  console.log("should hide is: " + shouldHide)



  try {

    TWITTER_FEED_CLASS = getTwitterFeedClassName();
    if (shouldHide) {
      hideTwitterFeed(true)
      hideTwitterPanel(true)
      injectIframe();
      homePageTwitterHidden = true;
    } else {
      hideTwitterFeed(false)
      hideTwitterPanel(false)
      homePageTwitterHidden = false;
      removeIframe()
    }
  } catch (err) {
    console.log(err);
  }
}
  
var intervalId;
var panelPageTwitterHidden = false
function tryBlockingTwitterHome() {
  console.log("we are trying to block twitter home")
  if (homePageTwitterHidden) {
    console.log("we can clear the interval")
    console.log(intervalId)
    clearInterval(intervalId);
    initialLoad = false;
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

function tryBlockingTwitterPanel() {
  console.log("we are trying to block twitter panel")
  if (panelPageTwitterHidden) {
    console.log("we can clear the interval")
    console.log(intervalId)
    clearInterval(pageInterval);
    return
  } else {
    try {
      if (hasTwitterPanelLoaded()) {
          console.log("here in blocking twitter panel")
          hideTwitterPanel(true);
          panelPageTwitterHidden= true
      }
    } catch (err) {
      console.log(err)
      // console.log("Panel hasn't been loaded yet");
    }
  }
}

function focusTwitter() {
  console.log("setting interval to block twitter")
  if (initialLoad) {
    console.log("1000 interval")
    intervalId = setInterval(tryBlockingTwitterHome, 1000);
  } else {
    intervalId = setInterval(tryBlockingTwitterHome, 100);
  }
}


var pageInterval;
function focusTwitterPanel(){
  pageInterval = setInterval(tryBlockingTwitterPanel, 200);
}




function hideTwitterFeed(shouldhide){
  if(shouldhide){
    TWITTER_FEED_PARENT_NODE = document.getElementsByClassName(
      TWITTER_FEED_CLASS
    )[1]

    TWITTER_FEED_CHILD = document.getElementsByClassName(
      TWITTER_FEED_CLASS
    )[1].children[0]

    TWITTER_FEED_PARENT_NODE.removeChild(TWITTER_FEED_PARENT_NODE.childNodes[0])

  }else{
    TWITTER_FEED_PARENT_NODE.append(TWITTER_FEED_CHILD)
  }
}


function hideTwitterPanel(shouldHide){

  let PANEL = getTwitterPanel()
  if(shouldHide){
    let i = 4
    while (PANEL.children.length > 1) {
      var nodeChild = PANEL.children[i].cloneNode(true)
      PANEL_ELEMENTS.push(nodeChild)
      PANEL.removeChild(PANEL.children[i])
      i-=1
    }
  }else{
    let i = 3
    while(i >= 0){
      PANEL.append(PANEL_ELEMENTS[i])
      i-=1
    }
  }
}




  
function homePageTwitterHasLoaded() {
  return hasTwitterPanelLoaded() && getTwitterFeed()
}


function getTwitterFeed(){
  return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
  .children[0].children[0].children[0].children[3]

  
}

function getTwitterPanel(){
  return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
  .children[0].children[1].children[0].children[1].children[0].children[0]
  .children[0]
}


function hasTwitterPanelLoaded(){
  let panel = getTwitterPanel()
  return panel.children.length == 5
}


function getTwitterFeedClassName() {
  let feed = getTwitterFeed()
  console.log(feed)
  if(feed != null){
    return feed.className
  }else{
    throw 'feed class name not found!';
  }
}


