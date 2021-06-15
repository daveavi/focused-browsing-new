function getTwitterFeed() {
    return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
        .children[0].children[0].children[0].children[3]
}

function getTwitterPanel() {
    return document.querySelectorAll('[role="main"]')[0].children[0].children[0]
        .children[0].children[1].children[0].children[1].children[0].children[0]
        .children[0]
}




module.exports = {getTwitterPanel, getTwitterFeed}