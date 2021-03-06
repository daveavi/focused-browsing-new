const LinkedInUtils = require("./LinkedInUtils.js")
import utils from '../utils'

export default class LinkedInController {
    constructor(port){
        this.port = port
        this.panel_elements= [] 
        this.linkedin_feed_child_node = null
        this.linkedin_ad_child_node = null
        this.feedIntervalId = 0
        this.panelInterval = 0
        this.adIntervalId = 0 
        this.initialLoad = false
        this.blockFeedAttemptCount = 0
        this.blockPanelAttemptCount = 0

        this.LINKEDIN_FEED_FRAME_HEIGHT = "1000px";
        this.LINKEDIN_FEED_FRAME_WIDTH = "549px";

        this.IFRAME_ClASS = "focus-card";

        this.feedIframe = this.createLinkedInIframe()

    }

    setPort(port){
        this.port = port
    }

    setPanelElements(panel_elements){
        this.panel_elements= panel_elements
    }


    handleActionOnPage(url, action){
        console.log(action)
        if(action == "focus"){
            this.focus(url)
        }else{
            this.unfocus(url)
        }

    }

    
    focus(url){
        if(url.includes("/feed")){
            this.focusFeed()
            this.focusPanel()
            this.focusAd()
        }
    }

    unfocus(url){
        utils.removeFocusedBrowsingCards()
        this.toggleLinkedInFeed(false)
        this.toggleLinkedInPanel(false)
        this.toggleLinkedInAd(false)
    }

    focusFeed(){
        this.feedIntervalId = setInterval(this.tryBlockingLinkedInFeed.bind(this), 500)
    }

    focusPanel(){
        this.panelIntervalId = setInterval(this.tryBlockingLinkedInPanel.bind(this), 500)
    }

    focusAd(){
        this.adIntervalId = setInterval(this.tryBlockingLinkedInAd.bind(this), 500)
    }


    toggleLinkedInAd(shouldHide){
        var linkedin_ad_parent_node = LinkedInUtils.getAdHeader()
        console.log(linkedin_ad_parent_node)
        if(shouldHide){
            this.linkedin_ad_child_node = linkedin_ad_parent_node.children[0]
            linkedin_ad_parent_node.removeChild(this.linkedin_ad_child_node)
        }else{
            linkedin_ad_parent_node.append(this.linkedin_ad_child_node)
        }
    }


    toggleLinkedInFeed(shouldHide){
        var linkedin_feed_parent_node = LinkedInUtils.getLinkedInFeed()
        if(shouldHide){
            this.linkedin_feed_child_node = linkedin_feed_parent_node.children[1]
            console.log(this.linkedin_feed_child_node)
            linkedin_feed_parent_node.removeChild(this.linkedin_feed_child_node)
            console.log(linkedin_feed_parent_node)
        }else{
            linkedin_feed_parent_node.append(this.linkedin_feed_child_node)
        }
    }

    toggleLinkedInPanel(shouldHide){
        let panel = LinkedInUtils.getLinkedInPanel()
        if(shouldHide){
          let length = panel.children.length
          console.log(panel.children)
          while (length != 0) {
            var currentLastChild = panel.children[length-1]
            this.panel_elements.push(currentLastChild)
            panel.removeChild(currentLastChild)
            length -= 1 
          }

        }else{
            for(let i =0; i<this.panel_elements.length; i+=1){
                panel.append(this.panel_elements[i])
            }
            this.panel_elements= []
        }
    }

    tryBlockingLinkedInAd(){
        try{
            if(LinkedInUtils.isAdHidden()){
                clearInterval(this.adIntervalId);
                return 
            }else{
                this.toggleLinkedInAd(true)
            }
        }catch(err){
            this.blockAdAttemptCount += 1
            if (this.blockAdAttemptCount > 2 && this.blockAdAttemptCount <= 4) {
                utils.sendLogToBackground(this.port, "WARNING: LinkedIn elements usually load by now")
            } else if (this.blockAdAttemptCount > 4 && this.blockAdAttemptCount < 8) {
                utils.sendLogToBackground(this.port, "ERROR: Something Wrong with the LinkedIn elements")
            } else if (this.blockAdAttemptCount > 8){
                clearInterval(this.adIntervalId);
            }
        }
    }

    tryBlockingLinkedInFeed(){
        try{
            if(LinkedInUtils.isFeedHidden()){
                clearInterval(this.feedIntervalId);
                return 
            }else{
                console.log(this.blockFeedAttemptCount)
                this.toggleLinkedInFeed(true)
                this.setIframeSource()
                let feed = LinkedInUtils.getLinkedInFeed()
                feed.append(this.feedIframe)
            }
        }catch(err){
            console.log(err)
            this.blockFeedAttemptCount += 1
            if (this.blockFeedAttemptCount > 2 && this.blockFeedAttemptCount <= 4) {
                utils.sendLogToBackground(this.port, "WARNING: LinkedIn elements usually load by now")
            } else if (this.blockFeedAttemptCount > 4 && this.blockFeedAttemptCount < 8) {
                utils.sendLogToBackground(this.port, "ERROR: Something Wrong with the LinkedIn elements")
            } else if (this.blockFeedAttemptCount > 8){
                clearInterval(this.feedIntervalId);
            }
        }
    }


    tryBlockingLinkedInPanel(){
        try{
            if(LinkedInUtils.isPanelHidden()){
                clearInterval(this.panelIntervalId);
                return 
            }else{
                this.toggleLinkedInPanel(true)
            }
        }catch(err){
            this.blockPanelAttemptCount += 1
            if (this.blockPanelAttemptCount > 2  && this.blockPanelAttemptCount <= 4) {
                utils.sendLogToBackground(this.port, "WARNING: LinkedIn elements usually load by now")
            } else if (this.blockPanelAttemptCount > 4 && this.blockPanelAttemptCount < 8) {
                utils.sendLogToBackground(this.port, "ERROR: Something Wrong with the LinkedIn elements")
            } else if (this.blockPanelAttemptCount > 8){
                clearInterval(this.panelIntervalId);
            }
        }
    }

    createLinkedInIframe(){
        let feedIframe = document.createElement("iframe")

        feedIframe.width = this.LINKEDIN_FEED_FRAME_WIDTH;
        feedIframe.height = this.LINKEDIN_FEED_FRAME_HEIGHT;
        feedIframe.className = this.IFRAME_ClASS;

        Object.assign(feedIframe.style, {
        position: "inherit",
        border: "none",
        });

        return feedIframe
    }

    setIframeSource(){
        this.feedIframe.src = chrome.runtime.getURL("www/linkedin/feed/linkedInFeed.html")
    }
    

}