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

  var onFirstSetupClick = function () {
    var similarWizards = getRandomWizards(4);
    renderSimilarWizards(similarWizards);
    setup.querySelector('.setup-similar').classList.remove('hidden');

    setupOpener.removeEventListener('click', onFirstSetupClick);
    setupOpener.removeEventListener('keydown', onFirstSetupEnterPress);
  };

  var onFirstSetupEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      var similarWizards = getRandomWizards(4);
      renderSimilarWizards(similarWizards);
      setup.querySelector('.setup-similar').classList.remove('hidden');

      window.colorize.userCoat(userCoat, userCoatColorInput);
      window.colorize.userEyes(userEyes, userEyesColorInput);
      window.colorize.userFireball(userFireball, userFireballColorInput);

      setupOpener.removeEventListener('click', onFirstSetupClick);
      setupOpener.removeEventListener('keydown', onFirstSetupEnterPress);
    }
  };

  var getRandomFullName = function () {
    var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

    return window.util.getRandomArrayItem(WIZARD_NAMES) + ' ' + window.util.getRandomArrayItem(WIZARD_SURNAMES);
  };

  var getRandomWizards = function (quantity) {
    var randomWizards = [];

    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: getRandomFullName(),
        coatColor: window.colorize.getRandomCoatColor(),
        eyesColor: window.colorize.getRandomEyesColor()
      };

      randomWizards.push(wizard);
    }

    return randomWizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item').cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    similarListElement.appendChild(fragment);
  };

  window.popup.init(setup, setupOpener, setupCloser);

  setupOpener.addEventListener('click', onFirstSetupClick);

  setupOpener.addEventListener('keydown', onFirstSetupEnterPress);

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

  setup.addEventListener('mousedown', window.dragAndAction.replace(setup, dialogHandler));
})();
