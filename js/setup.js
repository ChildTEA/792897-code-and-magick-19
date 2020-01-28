'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandonArrayItem = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getRandonFullName = function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  return getRandonArrayItem(WIZARD_NAMES) + ' ' + getRandonArrayItem(WIZARD_SURNAMES);
};

var getRandomCoatColor = function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  return getRandonArrayItem(COAT_COLORS);
};

var getRandonEyesColor = function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  return getRandonArrayItem(EYES_COLORS);
};

var getRandomWizards = function (quantity) {
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: getRandonFullName(),
      coatColor: getRandomCoatColor(),
      eyesColor: getRandonEyesColor()
    };

    wizards.push(wizard);
  }

  return wizards;
};

var wizards = getRandomWizards(4);

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
