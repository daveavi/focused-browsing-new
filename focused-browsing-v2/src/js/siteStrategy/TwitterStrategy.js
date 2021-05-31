const TwitterUtils = require("./TwitterUtils.js")

export default class TwitterStrategy {


    constructor(){
        this.PANEL_ELEMENTS = []
        this.TWITTER_FEED_CHILD_NODE = null
       
        this.feedIntervalId = 0
        this.pageInterval = 0
        this.initialLoad = false
        this.TWITTER_FEED_FRAME_HEIGHT = "4000px";
        this.TWITTER_FEED_FRAME_WIDTH = "598px";

        this.TWITTER_PANEL_FRAME_HEIGHT = "4000px";
        this.TWITTER_PANEL_FRAME_WIDTH = "350px";
        this.IFRAME_ClASS = "focus-card";

        let iframes = this.initIframeTwitter()
        this.feedIframe = iframes[0]
        this.panelIframe = iframes[1]

    }



    initIframeTwitter() {
      let feedIframe = document.createElement("iframe")
      let panelIframe = document.createElement("iframe")
  
      feedIframe.width = this.TWITTER_FEED_FRAME_WIDTH;
      feedIframe.height = this.TWITTER_FEED_FRAME_HEIGHT;
      feedIframe.className = this.IFRAME_ClASS;
  
      panelIframe.width = this.TWITTER_PANEL_FRAME_WIDTH;
      panelIframe.height = this.TWITTER_PANEL_FRAME_HEIGHT;
      panelIframe.className = this.IFRAME_ClASS;
  
      Object.assign(feedIframe.style, {
          position: "fixed",
          border: "none",
      });
  

  
      Object.assign(panelIframe.style, {
        position: "fixed",
        border: "none",
      });
  
  
      return [feedIframe, panelIframe]
  }

    clearPanelElements(){
      this.PANEL_ELEMENTS = []
    }
  
    setPanelElements(PANEL_ELEMENTS){
        this.PANEL_ELEMENTS = PANEL_ELEMENTS
    }

    
    focusTwitterPanel(){
        this.pageInterval = setInterval(this.tryBlockingTwitterPanel.bind(this), 700);
    }

    setIframeSource(){
      if(document.body.style.backgroundColor == "rgb(0, 0, 0)" || document.body.style.backgroundColor == "rgb(21, 32, 43)"){
        console.log("Setting dark mode cards")
        this.feedIframe.src = chrome.runtime.getURL("www/twitter/twitterFeedDark.html")
        this.panelIframe.src = chrome.runtime.getURL("www/twitter/twitterPanelDark.html");
      }else{
        this.feedIframe.src = chrome.runtime.getURL("www/twitter/twitterFeed.html")
        this.panelIframe.src = chrome.runtime.getURL("www/twitter/twitterPanel.html");
      }
    }


    focusTwitter() {
        console.log("setting interval to block twitter")
        if (!this.initialLoad) {
          this.feedIntervalId = setInterval(this.tryBlockingTwitterHome.bind(this), 500);
          this.initialLoad = !this.initialLoad
        } else {
          this.feedIntervalId = setInterval(this.tryBlockingTwitterHome.bind(this), 100);
        }
    }
      

    toggleTwitterHomeDistractions(shouldHide) {
        console.log("here we are in toggle twitter distraction")
        console.log("should hide is: " + shouldHide)
        try {
          if (shouldHide) {
            this.hideTwitterFeed(true)
            this.hideTwitterPanel(true)
            this.setIframeSource()
            this.injectCards("home")
          } else {
            this.hideTwitterFeed(false)
            this.hideTwitterPanel(false)
            // removeIframe()
          }
        } catch (err) {
          console.log(err);
        }
    }

  

    hideTwitterFeed(shouldhide){
        // console.log("want to hide feed")

        
        let FEED =  TwitterUtils.getTwitterFeed()
        if(shouldhide){
          console.log("want to hide feed")
          this.TWITTER_FEED_CHILD_NODE = FEED.children[0]
      
          FEED.removeChild(FEED.childNodes[0])
      
        }else{
          console.log("want to show feed")
          FEED.append(this.TWITTER_FEED_CHILD_NODE)
        }
    }
      
      
    hideTwitterPanel(shouldHide){
      
        let PANEL = TwitterUtils.getTwitterPanel()
        if(shouldHide){
          let length = PANEL.children.length

          while (length != 1) {
            var currentLastChild = PANEL.lastChild
            this.PANEL_ELEMENTS.push(currentLastChild)
            PANEL.removeChild(currentLastChild)
            length -= 1 
          }
          this.setIframeSource()
          this.injectCards("panel")

        }else{
          for(let i =0; i<this.PANEL_ELEMENTS.length; i+=1){
            PANEL.append(this.PANEL_ELEMENTS[i])
          }
          this.PANEL_ELEMENTS = []
      
        }
    }
      



    tryBlockingTwitterHome() {
        console.log("we are trying to block twitter home")
        // console.log(this.distractionsHidden("home"))
        if (this.distractionsHidden("home")) {
          console.log("we can clear the interval")
          console.log(this.feedIntervalId)
          clearInterval(this.feedIntervalId);
          this.initialLoad = false;
          return
        } else {
          console.log("distractions are not hidden")
          try {
            if (TwitterUtils.homePageTwitterHasLoaded()) {
                console.log("here in blocking twitter")
                this.toggleTwitterHomeDistractions(true);
            }
          } catch (err) {
            console.log(err)
            console.log("Feed hasn't been loaded yet");
          }
        }
    }

    tryBlockingTwitterPanel() {
        console.log("we are trying to block twitter panel")
        if (this.distractionsHidden("panel")) {
          console.log("we can clear the interval")
          console.log(this.pageInterval)
          clearInterval(this.pageInterval);
          return
        } else {
          try {
            if (TwitterUtils.hasTwitterPanelLoaded()) {
                console.log("here in blocking twitter panel")
                this.hideTwitterPanel(true);
            }
          } catch (err) {
            console.log("Panel hasn't been loaded yet");
          }
        }
    }

      
    distractionsHidden(isHomePage) {
        try{
            console.log("I am in the distractions function")
            let PANEL = TwitterUtils.getTwitterPanel()
            console.log(PANEL)
            if (isHomePage == "home") {
                let FEED = TwitterUtils.getTwitterFeed()
                return FEED.children[0].nodeName == "IFRAME" && PANEL.children.length == 2;
            } else {
                return PANEL.children.length == 2;
            }
        }catch(err){
            // console.log(err)
        }
    }


    injectCards(page) {
      
        if(page == "home"){
          let FEED =  TwitterUtils.getTwitterFeed()
          FEED.append(this.feedIframe)
        }
        let PANEL = TwitterUtils.getTwitterPanel()
        PANEL.append(this.panelIframe)
    }


}