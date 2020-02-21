'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpener = document.querySelector('.setup-open-icon');
  var setupCloser = setup.querySelector('.setup-close');
  var dialogHandler = setup.querySelector('.upload');
  var userNameInput = setup.querySelector('.setup-user-name');
  var userCoat = setup.querySelector('.setup-wizard-wrap .wizard-coat');
  var userCoatColorInput = setup.querySelector('input[name="coat-color"');
  var userEyes = setup.querySelector('.setup-wizard-wrap .wizard-eyes');
  var userEyesColorInput = setup.querySelector('input[name="eyes-color"]');
  var userFireball = setup.querySelector('.setup-fireball-wrap');
  var userFireballColorInput = setup.querySelector('input[name="fireball-color"]');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupSubmit = setupForm.querySelector('.setup-submit');
  var SIMILAR_WIZARDS_NUMBER = 4;
  var GET_SIMILAR_WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var SEND_SETUP_DATA_URL = 'https://js.dump.academy/code-and-magick';

  var onFirstSetupClick = function () {
    window.backend.load(GET_SIMILAR_WIZARDS_URL, renderSimilarWizards, onRequestError);

    setupOpener.removeEventListener('click', onFirstSetupClick);
    setupOpener.removeEventListener('keydown', onFirstSetupEnterPress);
  };

  var onFirstSetupEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {

      window.backend.load(GET_SIMILAR_WIZARDS_URL, renderSimilarWizards, onRequestError);

      window.colorize.userCoat(userCoat, userCoatColorInput);
      window.colorize.userEyes(userEyes, userEyesColorInput);
      window.colorize.userFireball(userFireball, userFireballColorInput);

      setupOpener.removeEventListener('click', onFirstSetupClick);
      setupOpener.removeEventListener('keydown', onFirstSetupEnterPress);
    }
  };

  var onFormSubmit = function () {
    setup.classList.add('hidden');
  };

  var renderWizard = function (wizard) {
    var wizardElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item').cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    var randomWizards = [];
    for (var i = 0; i < SIMILAR_WIZARDS_NUMBER; i++) {
      randomWizards.push(window.util.getRandomArrayItem(wizards));
    }

    randomWizards.forEach(function (randomWizard) {
      fragment.appendChild(renderWizard(randomWizard));
    });

    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
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

  window.popup.init(setup, setupOpener, setupCloser);
  window.dragAndAction.replace(setup, dialogHandler);

  setupOpener.addEventListener('click', onFirstSetupClick);
  setupOpener.addEventListener('keydown', onFirstSetupEnterPress);

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(SEND_SETUP_DATA_URL, new FormData(setupForm), onFormSubmit, onRequestError);
  });

  userNameInput.addEventListener('input', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  setupSubmit.addEventListener('click', function () {
    userNameInput.setCustomValidity('');
  });
})();
