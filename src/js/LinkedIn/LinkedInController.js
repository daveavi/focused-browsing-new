const LinkedInUtils = require("./LinkedInUtils.js")
import utils from '../utils'

export default class LinkedInController {
    constructor(port){
        this.port = port
        this.panel_elements= [] 
        this.linkedin_feed_child_node = null
        this.feedIntervalId = 0
        this.panelInterval = 0
        this.initialLoad = false
        this.port = null
        this.blockFeedAttemptCount = 0
        this.blockPanelAttemptCount = 0
    }

    setPort(port){
        this.port = port
    }

    setPanelElements(panel_elements){
        this.pane;_elements= panel_elements
    }


    handleActionOnPage(url, action){
        if(action == "focus"){
            this.focus(url)
        }else{
            this.unfocus(url)
        }

    }

    
    focus(url){
        if(url.includes("/feed")){
            this.focusFeed()
            // this.focusPanel()
        }
    }

    unfocus(url){
        this.toggleLinkedInFeed(false)
        this.toggleLinkedInPanel(false)
    }

    focusFeed(){
        this.feedIntervalId = setInterval(this.tryBlockingLinkedInFeed.bind(this), 500)
    }

    focusPanel(){
        this.panelIntervalId = setInterval(this.tryBlockingLinkedInPanel.bind(this), 500)
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


    tryBlockingLinkedInFeed(){
        try{
            console.log("I am trying to block the feed")
            if(LinkedInUtils.isFeedHidden()){
                console.log("feed is hidden")
                clearInterval(this.feedIntervalId);
                return 
            }else{
                console.log("blocking feed")
                this.toggleLinkedInFeed(true)
            }
        }catch(err){
            // console.log(err)
            this.blockFeedAttemptCount += 1
            if (this.blockFeedAttemptCount > 2) {
                utils.sendLogToBackground(this.port, "WARNING: Twitter elements usually load by now")
            } else if (this.blockFeedAttemptCount > 4 && this.blockFeedAttemptCount < 8) {
                utils.sendLogToBackground(this.port, "ERROR: Something Wrong with the twitter elements")
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
            if (this.blockPanelAttemptCount > 2) {
                utils.sendLogToBackground(this.port, "WARNING: Twitter elements usually load by now")
            } else if (this.blockPanelAttemptCount > 4 && this.blockPanelAttemptCount < 8) {
                utils.sendLogToBackground(this.port, "ERROR: Something Wrong with the twitter elements")
            } else if (this.blockPanelAttemptCount > 8){
                clearInterval(this.panelIntervalId);
            }
        }
    }


}