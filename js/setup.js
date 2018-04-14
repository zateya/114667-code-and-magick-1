'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

var setupSimilar = document.querySelector('.setup-similar');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');

var playerEyes = document.querySelector('.setup-player .wizard-eyes');
var playerFireball = document.querySelector('.setup-fireball-wrap');
var eyesColorInput = document.querySelector('[name = eyes-color]');
var fireballColorInput = document.querySelector('[name = fireball-color]');

var userNameInput = document.querySelector('.setup-user-name');

var wizardsFragment = document.createDocumentFragment();

var getRandomInt = function (num) {
  return Math.round(Math.random() * num);
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomInt(arr.length - 1)];
};

var getRandomBoolean = function () {
  return Boolean(Math.round(Math.random()));
};

var createElement = function () {
  var randomBoolean = getRandomBoolean();

  return {
    name: getRandomArrayElement(randomBoolean ? NAMES : SURNAMES) + ' ' + getRandomArrayElement(randomBoolean ? SURNAMES : NAMES),
    coatColor: getRandomArrayElement(COAT_COLORS),
    eyesColor: getRandomArrayElement(EYES_COLORS)
  };
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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

playerEyes.addEventListener('click', function () {
  eyesColorInput.value = playerEyes.style.fill = getRandomArrayElement(EYES_COLORS);
});

playerFireball.addEventListener('click', function () {
  fireballColorInput.value = playerFireball.style.background = getRandomArrayElement(FIREBALL_COLORS);
});

userNameInput.addEventListener('invalid', function () {
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

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var data = createElements(WIZARDS_COUNT);
renderWizards(data);

setupSimilar.classList.remove('hidden');
