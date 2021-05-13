var appIframe;
const DEFAULT_FRAME_HEIGHT = "100px";
const DEFAULT_FRAME_WIDTH = "120px";




const port = chrome.runtime.connect({ name: "Focused Browsing"});
port.postMessage({url:  window.location.toString()});

;(function () {
    console.log("welcome to the content script")
    initIframe()
    startIframe()
    injectIframe()
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
    // document.body.style.paddingLeft = width;
    Object.assign(appIframe.style, {
        position: "fixed",
        border: "none",
        zIndex: "10000",
    });
    document.body.prepend(appIframe);
    console.log(appIframe);
}


