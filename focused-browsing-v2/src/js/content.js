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

function focusListener(msg) {
  console.log(msg)
  let status = msg.status
  let method = msg.method
  let url = msg.url
  if (status == "focus"){
     if (url.includes("twitter")) {
          if(method == "initial"){
              focusTwitter();
          }else if(method == "hidePanels"){
            hideTwitterPanel(true)
            hideTopicsToFollow(true)
            areDistractionsHidden = false;
          }else{
              toggleTwitterDistractions(true);
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
  
  var areDistractionsHidden = false;
  function toggleTwitterDistractions(shouldHide) {
    console.log("here we are in toggle twitter distraction")
    console.log("should hide is: " + shouldHide)



    try {

      TWITTER_FEED_CLASS = getTwitterFeedClassName();
      // TWITTER_PANEL_CLASS = getTwitterPanelClassName();

      console.log(TWITTER_FEED_CLASS)
      // console.log(TWITTER_PANEL_CLASS)

      if (shouldHide) {
        // document.getElementsByClassName(
        //   TWITTER_FEED_CLASS
        // )[1].style.visibility = VISIBILITY_HIDDEN;
        hideTwitterFeed(true)
        // setTimeOut(hideTwitterPanel(true), 200)
        hideTwitterPanel(true)
        // hideTopicsToFollow(true)
        injectIframe();
        areDistractionsHidden = true;
      } else {
        console.log("here is our un focus block of code")
        // document.getElementsByClassName(
        //   TWITTER_FEED_CLASS
        // )[1].style.visibility = VISIBILITY_VISIBLE;
        hideTwitterFeed(false)
        hideTwitterPanel(false)
        hideTopicsToFollow(false)
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
  
  function focusTwitter() {
    console.log("setting interval to block twitter")
    if (initialLoad) {
      intervalId = setInterval(tryBlockingTwitterHome, 1000);
    } else {
      intervalId = setInterval(tryBlockingTwitterHome, 100);
    }
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
    console.log(TWITTER_FEED_CHILD)
  }else{
    console.log(TWITTER_FEED_CHILD)
    TWITTER_FEED_PARENT_NODE.append(TWITTER_FEED_CHILD)

  }
}

var firstHide = true
function hideTwitterPanel(shouldHide){
  if(shouldHide){
    // document.getElementsByClassName(
    //   TWITTER_PANEL_CLASS
    // )[0].style.visibility = VISIBILITY_HIDDEN;
    let PANEL = getTwitterPanel()

    console.log("here are the panels children")
    console.log(PANEL.children)
    console.log(PANEL.children.length)

    // for(let i=1; i<PANEL.children.length; i++){
    //   // PANEL_ELEMENTS.append(PANEL[i])
    //   console.log("i is: "+ i)
    //   console.log(PANEL.children[i])
    //   PANEL.removeChild(PANEL.children[i])
    // }
    // console.log(PANEL.children)

    i = 4
    while (PANEL.children.length > 1) {
      PANEL.removeChild(PANEL.children[i])
      i-=1
    }
    
  }else{
    // document.getElementsByClassName(
    //   TWITTER_PANEL_CLASS
    // )[0].style.visibility = VISIBILITY_VISIBLE;
    
  }
}

function hideTopicsToFollow(shouldHide){

  // if(shouldHide){   
  //   if(!TOPICS_TO_FOLLOW){
  //     TOPICS_TO_FOLLOW = getTwitterTopicsToFollow()
  //   }
  //   TOPICS_TO_FOLLOW.style.visibility = VISIBILITY_HIDDEN
  // }else{
  //   TOPICS_TO_FOLLOW.style.visibility = VISIBILITY_VISIBLE
  // }


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
    console.log(panel.children.length)
    console.log(panel.children)
    console.log(panel.children.length)
    return panel.children.length == 5
  }

  function getTwitterTopicsToFollow(){
    let topics_to_follow_index = 3
    if(!initialLoad){
      console.log("here")
      topics_to_follow_index = 4
    }
   
    return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
    .children[0].children[1].children[0].children[1].children[0].children[0]
    .children[0].children[topics_to_follow_index]
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
  
  function getTwitterPanelClassName() {
    let panel = getTwitterPanel()
    console.log(panel)
    if(panel != null){
      return panel.className
    }else{
      throw 'panel class name not found!';
    }
  }


//   function getChildIndexOfFeedContainer(){
//     var childElementIndex = 0;
//     if(document.querySelectorAll(FEED_CONTAINER_CLASS_NAME)[childElementIndex].innerText.includes("Messages")){
//         childElementIndex = 1
//     }else{
//         childElementIndex = 0
//     }

//     return childElementIndex
// }


