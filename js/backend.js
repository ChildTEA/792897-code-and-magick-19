'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var checkStatus = function (xhr, onError) {
    switch (xhr.status) {

      case 400:
        onError('Статус ответа: ' + xhr.status + '. Неправильный запрос.');
        break;

      case 404:
        onError('Статус ответа: ' + xhr.status + '. Запрашиваемый ресурс не найден');
        break;

      default:
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        break;
    }
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        checkStatus(xhr, onError);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'ms');
    });

    xhr.timeout = TIMEOUT_IN_MS;


    xhr.open('GET', url);
    xhr.send();
  };


  window.backend = {
    load: load,
  };
})();
