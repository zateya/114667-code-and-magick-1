'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/code-and-magick';
  var OK_STATUS = 200;
  var TIMEOUT = 10000;

  var setupRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    showError: function (errorMessage) {
      var errorBlock = document.createElement('div');
      errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorBlock.style.position = 'absolute';
      errorBlock.style.left = 0;
      errorBlock.style.right = 0;
      errorBlock.style.fontSize = '30px';

      errorBlock.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorBlock);
    }
  };
})();
