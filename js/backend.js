'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var addRequestHandlers = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
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
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'ms');
    });
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    addRequestHandlers(xhr, onLoad, onError);

    xhr.open('GET', url);
    xhr.send();
  };


  var save = function (url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    addRequestHandlers(xhr, onLoad, onError);

    xhr.open('POST', url);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save
  };
})();
