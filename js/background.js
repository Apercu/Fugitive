function createFugitiveToClipboard (url) {

  var request = new XMLHttpRequest();

  request.open('POST', 'http://fugitive.link/create', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 201) {
      var txt = document.createElement('textarea');
      document.body.appendChild(txt);

      txt.value = 'http://fugitive.link/' + JSON.parse(request.response).src;
      txt.focus();
      txt.select();
      document.execCommand('copy');

      txt.remove();
    }
  }

  request.send('dst=' + url);

}

chrome.browserAction.onClicked.addListener(function (tab) {
  createFugitiveToClipboard(tab.url);
});

chrome.contextMenus.create({ title: 'Create a fugitive to this link', contexts: ['link'], onclick: function (res) {
  if (!res.linkUrl || res.linkUrl === 'javascript:void(0)') { return ; }
  createFugitiveToClipboard(res.linkUrl);
}});
