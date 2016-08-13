var baseUrl = 'https://fugitive.sigsev.io/'

function createFugitiveToClipboard (url) {

  var request = new XMLHttpRequest()

  request.open('POST', baseUrl + 'create', true)
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var txt = document.createElement('textarea')
      txt.style.position = 'fixed'
      txt.style.opacity = 0
      txt.value = baseUrl + request.response

      document.body.appendChild(txt)
      txt.select()
      document.execCommand('copy')

      txt.remove()
    }
  }

  request.send('dst=' + url)

}

chrome.browserAction.onClicked.addListener(function (tab) {
  createFugitiveToClipboard(tab.url)
})

chrome.contextMenus.create({ title: 'Create a fugitive to this link', contexts: ['link'], onclick: function (res) {
  if (!res.linkUrl || res.linkUrl === 'javascript:void(0)') { return }
  createFugitiveToClipboard(res.linkUrl)
}})
