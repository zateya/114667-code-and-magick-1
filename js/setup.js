'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var wizardsFragment = document.createDocumentFragment();

var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomBoolean = function () {
  return Boolean(Math.round(Math.random()));
};

var createElement = function () {
  var element = {};
  var randomBoolean = getRandomBoolean();

  element.name = getRandomArrayElement(randomBoolean ? NAMES : SURNAMES) + ' ' + getRandomArrayElement(randomBoolean ? SURNAMES : NAMES);
  element.coatColor = getRandomArrayElement(COAT_COLORS);
  element.eyesColor = getRandomArrayElement(EYES_COLORS);

  return element;
};

var createElements = function (number) {
  var elements = [];

  for (var i = 0; i < number; i++) {
    elements.push(createElement());
  }

  return elements;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  wizards.forEach(function (wizard) {
    wizardsFragment.appendChild(renderWizard(wizard));
  });

  similarWizardsList.appendChild(wizardsFragment);
};

var data = createElements(WIZARDS_COUNT);
renderWizards(data);

setupWindow.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
