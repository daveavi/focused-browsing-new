// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

export default function attachContentHooks (bridge) {
  // handle event
  bridge.on('timeout', function (event) {
    document.getElementsByTagName('body')[0].remove()
  })

  bridge.on('activateTimeOut', function (event){
    document.body.prepend(createIframe())
  })
}

// create iframe
function createIframe () {
  const iframe = document.createElement('iframe')
  iframe.width = '120px'
  iframe.height = '50px'

  Object.assign(iframe.style, {
    position: 'fixed',
    border: 'none',
    zIndex: '10000'
  })

  iframe.src = chrome.runtime.getURL('www/index.html')
  console.log(iframe.src)
  return iframe
}
