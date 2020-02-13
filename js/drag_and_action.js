'use strict';

(function () {
  var replace = function (block, handler) {
    var onMouseDown = function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        isDragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        block.style.top = (block.offsetTop - shift.y) + 'px';
        block.style.left = (block.offsetLeft - shift.x) + 'px';

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (isDragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handler.removeEventListener('click', onClickPreventDefault);
          };
          handler.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    handler.addEventListener('mousedown', onMouseDown);
  };

  var reset = function (block, closer) {

    var getStartCoords = function () {
      return {
        x: block.offsetLeft,
        y: block.offsetTop
      };
    };

    var startCoords = getStartCoords();

    var onEscapePress = function (evt) {
      if (evt.code === window.util.ESCAPE_KEYCODE) {
        block.style.top = startCoords.y + 'px';
        block.style.left = startCoords.x + 'px';

        document.removeEventListener('keydown', onEscapePress);
        closer.removeEventListener('click', onCloserClick);
        closer.removeEventListener('keydown', onCloserEnterPress);
      }
    };

    var onCloserClick = function () {
      block.style.top = startCoords.y + 'px';
      block.style.left = startCoords.x + 'px';

      document.removeEventListener('keydown', onEscapePress);
      closer.removeEventListener('click', onCloserClick);
      closer.removeEventListener('keydown', onCloserEnterPress);
    };

    var onCloserEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        block.style.top = startCoords.y + 'px';
        block.style.left = startCoords.x + 'px';

        block.removeEventListener('keydown', onEscapePress);
        closer.removeEventListener('click', onCloserClick);
        closer.removeEventListener('keydown', onCloserEnterPress);
      }
    };

    document.addEventListener('keydown', onEscapePress);
    closer.addEventListener('click', onCloserClick);
    closer.addEventListener('keydown', onCloserEnterPress);
  };

  window.dragAndAction = {
    replace: replace,
    reset: reset
  };
})();
