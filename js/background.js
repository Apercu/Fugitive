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

  if (url) {
    request.send('dst=' + url);
  } else {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
      request.send('dst=' + tabs[0].url);
    });
  }

}

chrome.commands.onCommand.addListener(function (command) {
  if (command === 'convert-current-url') {
    createFugitiveToClipboard();
  }
});

chrome.contextMenus.create({ title: 'Create a fugitive to this link', contexts: ['link'], onclick: function (res) {
  if (res.linkUrl === 'javascript:void(0)') {
    return ;
  }
  createFugitiveToClipboard(res.linkUrl);
}});
