'use strict';

var ESCAPE_KEYCODE = 'Escape';
var ENTER_KEYCODE = 'Enter';
var SPACE_KEYCODE = 'Space';
var setup = document.querySelector('.setup');
var setupOpener = document.querySelector('.setup-open-icon');
var setupCloser = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var userCoat = setup.querySelector('.setup-wizard-wrap .wizard-coat');
var userCoatColorInput = setup.querySelector('input[name="coat-color"');
var userEyes = setup.querySelector('.setup-wizard-wrap .wizard-eyes');
var userEyesColorInput = setup.querySelector('input[name="eyes-color"]');
var userFireball = setup.querySelector('.setup-fireball-wrap');
var userFireballInput = setup.querySelector('input[name="fireball-color"]');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupSubmit = setupForm.querySelector('.setup-submit');

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

var onPopupEscPress = function (evt) {
  if (evt.code === ESCAPE_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  deleteSimilarWizards();
  showSimilarWizards();
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  deleteSimilarWizards();
};

var changeUserCoatColor = function () {
  var color = getRandomCoatColor();
  userCoat.style.fill = color;
  userCoatColorInput.value = color;
};

var changeUserEyesColor = function () {
  var color = getRandomEyesColor();
  userEyes.style.fill = color;
  userEyesColorInput.value = color;
};

var changeUserFireballColor = function () {
  var color = getRandomFireballColor();
  userFireball.style.backgroundColor = color;
  userFireballInput.value = getRandomFireballColor();
};

setupOpener.addEventListener('click', function () {
  openPopup();
});

setupOpener.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloser.addEventListener('click', function () {
  closePopup();
});

setupCloser.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE) {
    closePopup();
  }
});

userCoat.addEventListener('click', function () {
  changeUserCoatColor();
});

userCoat.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE || evt.code === SPACE_KEYCODE) {
    changeUserCoatColor();
  }
});

userEyes.addEventListener('click', function () {
  changeUserEyesColor();
});

userEyes.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE || evt.code === SPACE_KEYCODE) {
    changeUserEyesColor();
  }
});

userFireball.addEventListener('click', function () {
  changeUserFireballColor();
});

userFireball.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER_KEYCODE || evt.code === SPACE_KEYCODE) {
    changeUserFireballColor();
  }
});


var getRandomArrayItem = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getRandomFullName = function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  return getRandomArrayItem(WIZARD_NAMES) + ' ' + getRandomArrayItem(WIZARD_SURNAMES);
};

var getRandomCoatColor = function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  return getRandomArrayItem(COAT_COLORS);
};

var getRandomEyesColor = function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  return getRandomArrayItem(EYES_COLORS);
};

var getRandomFireballColor = function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  return getRandomArrayItem(FIREBALL_COLORS);
};

var getRandomWizards = function (quantity) {
  var randomWizards = [];

  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: getRandomFullName(),
      coatColor: getRandomCoatColor(),
      eyesColor: getRandomEyesColor()
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

var deleteSimilarWizards = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.innerHTML = '';
};

var showSimilarWizards = function () {
  var similarWizards = getRandomWizards(4);
  renderSimilarWizards(similarWizards);
  setup.querySelector('.setup-similar').classList.remove('hidden');
};
