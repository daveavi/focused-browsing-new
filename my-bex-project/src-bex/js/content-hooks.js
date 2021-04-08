// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

export default function attachContentHooks (bridge) {
  // handle event
  bridge.on('timeout', function (event) {
    document.getElementsByTagName('body')[0].remove()
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

  return iframe
}

// inject iframe
document.body.prepend(createIframe())