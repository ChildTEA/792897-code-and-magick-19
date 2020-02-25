'use strict';

(function () {
  var SIMILAR_WIZARDS_DOWNLOAD_URL = 'https://js.dump.academy/code-and-magick/data';

  var wizards = [];
  var userCoatColor = window.wizard.userColors.onCoatChange();
  var userEyesColor = window.wizard.userColors.onEyesChange();
  var userFireballColor = window.wizard.userColors.onFireballChange();

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === userCoatColor) {
      rank += 3;
    }
    if (wizard.colorEyes === userEyesColor) {
      rank += 2;
    }
    if (wizard.colorFireball === userFireballColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var sortedWizards = wizards.concat();

    sortedWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    window.render.wizards(sortedWizards);
  };

  window.wizard.userColors.onCoatChange = window.debounce(function (color) {
    userCoatColor = color;
    updateWizards();
  });

  window.wizard.userColors.onEyesChange = window.debounce(function (color) {
    userEyesColor = color;
    updateWizards();
  });

  window.wizard.userColors.onFireballChange = window.debounce(function (color) {
    userFireballColor = color;
    updateWizards();
  });

  var onRequestSuccess = function (data) {
    wizards = (data);
    updateWizards();
  };

  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;

    document.body.prepend(node);
  };

  window.backend.load(SIMILAR_WIZARDS_DOWNLOAD_URL, onRequestSuccess, onRequestError);


  window.similar = {
    updateWizards: updateWizards
  };
})();
