export default class TwitterStrategy {

    constructor(feedIframe,panelIframe){
        this.PANEL_ELEMENTS = []
        this.appIframe = appIframe
        this.TWITTER_FEED_PARENT_NODE = null
        this.TWITTER_FEED_CHILD_NODE = null
        this.TWITTER_FEED_CLASS = ""
        this.feedIntervalId = 0
        this.pageInterval = 0
        this.initialLoad = false
        this.feedIframe = feedIframe
        this.panelIframe = panelIframe
    }
      

    getTwitterFeed(){
        return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
        .children[0].children[0].children[0].children[3] 
    }
      
    getTwitterPanel(){
        return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
        .children[0].children[1].children[0].children[1].children[0].children[0]
        .children[0]
    }
      
      
    hasTwitterPanelLoaded(){
        let panel = this.getTwitterPanel()
        return panel.children.length == 5 || panel.children.length == 2
    }
      
      
    getTwitterFeedClassName() {
        let feed = this.getTwitterFeed()
        if(feed != null){
          return feed.className
        }else{
          throw 'feed class name not found!';
        }
    }

    setPanelElements(PANEL_ELEMENTS){
        this.PANEL_ELEMENTS = PANEL_ELEMENTS
    }

    homePageTwitterHasLoaded() {
        return this.getTwitterPanel() && this.getTwitterFeed()
    }
    
    
    focusTwitterPanel(){
        this.pageInterval = setInterval(this.tryBlockingTwitterPanel.bind(this), 700);
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
            this.injectIframe();
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
        if(shouldhide){
          console.log("want to hide feed")
          if(this.TWITTER_FEED_CLASS == ""){
            console.log("FEED CLASS name is "+ this.TWITTER_FEED_CLASS)
            this.TWITTER_FEED_CLASS = this.getTwitterFeedClassName()
            console.log("NOW FEED CLASS name is "+ this.TWITTER_FEED_CLASS)
          }

          this.TWITTER_FEED_PARENT_NODE = document.getElementsByClassName(
            this.TWITTER_FEED_CLASS
          )[1]
      
          this.TWITTER_FEED_CHILD_NODE = document.getElementsByClassName(
            this.TWITTER_FEED_CLASS
          )[1].children[0]
      
          this.TWITTER_FEED_PARENT_NODE.removeChild(this.TWITTER_FEED_PARENT_NODE.childNodes[0])
      
        }else{
          console.log("want to show feed")
          this.TWITTER_FEED_PARENT_NODE.append(this.TWITTER_FEED_CHILD_NODE)
        }
    }
      
      
    hideTwitterPanel(shouldHide){
      
        let PANEL = this.getTwitterPanel()
        if(shouldHide){
          let length = PANEL.children.length

          while (length != 1) {
            var currentLastChild = PANEL.lastChild
            this.PANEL_ELEMENTS.push(currentLastChild)
            PANEL.removeChild(currentLastChild)
            length -= 1 
          }

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
            if (this.homePageTwitterHasLoaded()) {
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
            if (this.hasTwitterPanelLoaded()) {
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
            let PANEL = this.getTwitterPanel()
            console.log(PANEL)
            if (isHomePage == "home") {
                let FEED = this.getTwitterFeed()
                return FEED.children[0].nodeName == "IFRAME" && PANEL.children.length == 1;
            } else {
                return PANEL.children.length == 1
            }
        }catch(err){
            console.log(err)
        }
    }


    injectIframe() {
        this.TWITTER_FEED_PARENT_NODE.append(this.appIframe)
    }

}