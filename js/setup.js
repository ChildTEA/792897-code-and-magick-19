'use strict';

var showSetupWindow = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

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


var similarWizards = getRandomWizards(4);
renderSimilarWizards(similarWizards);
showSetupWindow();
