import TwitterUtils from './TwitterUtils'
export default class TwitterStrategy {


  constructor(port) {
    this.port = port
    this.PANEL_ELEMENTS = []
    this.TWITTER_FEED_CHILD_NODE = null

    this.feedIntervalId = 0
    this.pageInterval = 0
    this.initialLoad = false
    this.TWITTER_FEED_FRAME_HEIGHT = "1000px";
    this.TWITTER_FEED_FRAME_WIDTH = "598px";

    this.TWITTER_PANEL_FRAME_HEIGHT = "4000px";
    this.TWITTER_PANEL_FRAME_WIDTH = "350px";
    this.IFRAME_ClASS = "focus-card";

    let iframes = this.initIframeTwitter()
    this.feedIframe = iframes[0]
    this.panelIframe = iframes[1]

    this.twitterBlockingAttempts = 0
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

  clearPanelElements() {
    this.PANEL_ELEMENTS = []
  }

  focusTwitterPanel() {
    this.pageInterval = setInterval(this.tryBlockingTwitterPanel.bind(this), 700);
  }

  setFeedIframeSource() {
    if (document.body.style.backgroundColor == "rgb(0, 0, 0)") {
      this.feedIframe.src = chrome.runtime.getURL("www/twitter/feed/twitterFeedDark.html")
    } else if (document.body.style.backgroundColor == "rgb(21, 32, 43)") {
      this.feedIframe.src = chrome.runtime.getURL("www/twitter/feed/twitterFeedDim.html")
    } else {
      this.feedIframe.src = chrome.runtime.getURL("www/twitter/feed/twitterFeed.html")
    }
  }

  setPanelIframeSource() {
    if (document.body.style.backgroundColor == "rgb(0, 0, 0)" || document.body.style.backgroundColor == "rgb(21, 32, 43)") {
      this.panelIframe.src = chrome.runtime.getURL("www/twitter/panel/twitterPanelDark.html")
    } else {
      this.panelIframe.src = chrome.runtime.getURL("www/twitter/panel/twitterPanel.html")
    }
  }


  focusTwitter() {
    if (!this.initialLoad) {
      this.feedIntervalId = setInterval(this.tryBlockingTwitterHome.bind(this), 500);
      this.initialLoad = !this.initialLoad
    } else {
      this.feedIntervalId = setInterval(this.tryBlockingTwitterHome.bind(this), 100);
    }
  }


  toggleTwitterHomeDistractions(shouldHide) {
    if (shouldHide) {
      this.hideTwitterFeed(true)
      this.hideTwitterPanel(true)
      this.injectCards("home")
    } else {
      this.hideTwitterFeed(false)
      this.hideTwitterPanel(false)
    }
  }



  hideTwitterFeed(shouldhide) {
    let FEED = TwitterUtils.getTwitterFeed()
    if (shouldhide) {
      this.TWITTER_FEED_CHILD_NODE = FEED.children[0]

      FEED.removeChild(FEED.childNodes[0])

    } else {
      FEED.append(this.TWITTER_FEED_CHILD_NODE)
    }
  }


  hideTwitterPanel(shouldHide) {

    let PANEL = TwitterUtils.getTwitterPanel()
    if (shouldHide) {
      let length = PANEL.children.length

      while (length != 1) {
        var currentLastChild = PANEL.lastChild
        this.PANEL_ELEMENTS.push(currentLastChild)
        PANEL.removeChild(currentLastChild)
        length -= 1
      }
      this.injectCards("panel")

    } else {
      for (let i = 0; i < this.PANEL_ELEMENTS.length; i += 1) {
        PANEL.append(this.PANEL_ELEMENTS[i])
      }
      this.clearPanelElements()

    }
  }




  tryBlockingTwitterHome() {
    try {
      if (this.distractionsHidden("home")) {
        clearInterval(this.feedIntervalId);
        this.initialLoad = false;
        return
      } else {
        this.toggleTwitterHomeDistractions(true);
      }
    } catch (err) {

      this.blockAttemptCount += 1
      if (this.blockAttemptCount > 2) {
        TwitterUtils.sendLogToBackground(this.port, "WARNING: Twitter elements usually load by now")
      } else if (this.blockAttemptCount > 4 && this.blockAttemptCount < 8) {
        TwitterUtils.sendLogToBackground(this.port, "ERROR: Something Wrong with the twitter elements")
      } else {
        clearInterval(this.pageInterval);
      }

    }
  }

  tryBlockingTwitterPanel() {
    try {
      if (this.distractionsHidden("panel")) {
        clearInterval(this.pageInterval);
        return
      } else {
        this.hideTwitterPanel(true);
      }
    } catch (err) {
      this.blockAttemptCount += 1
      if (this.blockAttemptCount > 2) {
        TwitterUtils.sendLogToBackground(this.port, "WARNING: Twitter elements usually load by now")
      } else if (this.blockAttemptCount > 4 && this.blockAttemptCount < 8) {
        TwitterUtils.sendLogToBackground(this.port, "ERROR: Something Wrong with the twitter elements")
      } else {
        clearInterval(this.pageInterval);
      }
    }
  }


  distractionsHidden(isHomePage) {
    let PANEL = TwitterUtils.getTwitterPanel()
    if (isHomePage == "home") {
      let FEED = TwitterUtils.getTwitterFeed()
      return FEED.children[0].nodeName == "IFRAME" && PANEL.children.length == 2;
    } else {
      return PANEL.children.length == 2;
    }
  }


  injectCards(page) {
    this.setPanelIframeSource()
    if (page == "home") {
      this.setFeedIframeSource()
      let FEED = TwitterUtils.getTwitterFeed()
      FEED.append(this.feedIframe)
    }
    let PANEL = TwitterUtils.getTwitterPanel()
    PANEL.append(this.panelIframe)
  }


}