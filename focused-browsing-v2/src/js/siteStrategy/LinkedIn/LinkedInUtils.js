const LINKEDIN_FEED_CLASS = "scaffold-layout__main"
const PANEL_CLASS = "scaffold-layout__aside"

function getLinkedInFeed(){
    return document.getElementsByClassName(LINKEDIN_FEED_CLASS)[0].children[2]
}
  
function getLinkedInPanel(){
    return document.getElementsByClassName(PANEL_CLASS)[0]
}
  
  
function hasLinkedInPanelLoaded(){
    let panel = getLinkedInPanel()
    return panel.children.length == 3
}


module.exports = {getLinkedInFeed, getLinkedInPanel, hasLinkedInPanelLoaded}