export default class LinkedInStrategy {
    constructor(feedIframe,panelIframe){
        this.PANEL_ELEMENTS = [] 
        this.LINKEDIN_FEED_CLASS = "scaffold-layout__main"
        this.PANEL_CLASS = "scaffold-layout__aside"
        this.feedIntervalId = 0
        this.pageInterval = 0
        this.initialLoad = false;
        this.feedIframe = feedIframe
        this.panelIframe = panelIframe
    }



    getLinkedInFeed(){
        return document.getElementsByClassName(this.LINKEDIN_FEED_CLASS)[0].children[2]
    }
      
    getLinkedInPanel(){
        return document.getElementsByClassName(this.PANEL_CLASS)[0]
    }
      
      
    hasLinkedInPanelLoaded(){
        let panel = this.getLinkedInPanel()
        return panel.children.length == 3
    }
      
    setPanelElements(PANEL_ELEMENTS){
        this.PANEL_ELEMENTS = PANEL_ELEMENTS
    }

    homePageLinkedInHasLoaded() {
        return this.hasLinkedInPanelLoaded() && this.getLinkedInFeed()
    }

    focusLinkedIn() {
        console.log("setting interval to block LINKEDIN")
        if (!this.initialLoad) {
          this.feedIntervalId = setInterval(this.tryBlockingLinkedInHome.bind(this), 500);
          this.initialLoad = !this.initialLoad
        } else {
          this.feedIntervalId = setInterval(this.tryBlockingLinkedInHome.bind(this), 100);
        }
    }

    tryBlockingLinkedInHome(){
        console.log("we are trying to block LINKEDIN home")
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
            if (this.homePageLinkedInHasLoaded()) {
                console.log("here in blocking LINKEDIN")
                this.toggleLinkedInHomeDistractions(true);
            }
          } catch (err) {
            console.log(err)
            console.log("Feed hasn't been loaded yet");
          }
        }
    }

    toggleLinkedInHomeDistractions(shouldHide){
        try {
            if (shouldHide) {
              this.hideLinkedInFeed(true)
              this.hideLinkedInPanel(true)
              this.injectFeedCard();
            } else {
              this.hideLinkedInFeed(false)
              this.hideLinkedInPanel(false)
              // removeIframe()
            }
          } catch (err) {
            console.log(err);
          }
    }

    hideLinkedInFeed(shouldHide){
        if(shouldHide){
            console.log("here trying to hide lInkedin FEED")
            this.LINKEDIN_FEED_PARENT_NODE = this.getLinkedInFeed()

            this.LINKEDIN_FEED_CHILD_NODE = this.LINKEDIN_FEED_PARENT_NODE.children[1]
            console.log(this.LINKEDIN_FEED_CHILD_NODE)
            this.LINKEDIN_FEED_PARENT_NODE.removeChild(this.LINKEDIN_FEED_CHILD_NODE)
            console.log(this.LINKEDIN_FEED_PARENT_NODE)
        }else{
            this.LINKEDIN_FEED_PARENT_NODE.append(this.LINKEDIN_FEED_CHILD_NODE)
        }
    }

    hideLinkedInPanel(shouldHide){
        let PANEL = this.getLinkedInPanel()
        if(shouldHide){
          let length = PANEL.children.length
          console.log(PANEL.children)
          while (length != 0) {
            var currentLastChild = PANEL.children[length-1]
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

    distractionsHidden(isHome){
        try{
            console.log("I am in the distractions function")
            let PANEL = this.getLinkedInPanel()
            console.log(PANEL)
            if (isHome == "home") {
                let FEED = this.getLinkedInFeed()
                // return FEED.children[0].nodeName == "IFRAME" && PANEL.children.length == 1;
                return FEED.children.length == 2 && PANEL.children.length == 0;
            } else {
                return PANEL.children.length == 1
            }

        }catch(err){
            console.log(err)
        }
    }

    injectFeedCard() {
        this.LINKEDIN_FEED_PARENT_NODE.append(this.feedIframe)
    }
   








}