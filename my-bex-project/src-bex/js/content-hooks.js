// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
const FEED_CLASS = "css-1dbjc4n r-1jgb5lz r-1ye8kvj r-13qz1uu";

export default function attachContentHooks (bridge) {
  // handle event
  bridge.on('focus', function (event) {
    console.log("got here")
    document.getElementsByClassName(FEED_CLASS)[1].style.visibility = "hidden"
  })

  bridge.on('un-focus', function (event) {
    document.getElementsByClassName(FEED_CLASS)[1].style.visibility = "visible"
  })

  bridge.on('activateFocus', function (event){
    console.log(event.data)
    const openExtension = event.data.openExtension
    if (openExtension){
      document.body.prepend(createIframe())
    }else{
      document.getElementsByTagName('iframe')[0].remove()
    }
  })


}

// create iframe
function createIframe () {
  const iframe = document.createElement('iframe')
  iframe.width = '120px'
  iframe.height = '100px'

  Object.assign(iframe.style, {
    position: 'fixed',
    border: 'none',
    zIndex: '10000'
  })

  iframe.src = chrome.runtime.getURL('www/index.html')
  console.log(iframe.src)
  return iframe
}
