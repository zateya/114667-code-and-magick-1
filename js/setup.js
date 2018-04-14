'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var playerSetup = document.querySelector('.setup-player');
  var playerEyes = playerSetup.querySelector('.wizard-eyes');
  var playerFireball = playerSetup.querySelector('.setup-fireball-wrap');
  var playerCoat = playerSetup.querySelector('.wizard-coat');

  var eyesColorInput = playerSetup.querySelector('[name = eyes-color]');
  var fireballColorInput = playerSetup.querySelector('[name = fireball-color]');
  var coatColorInput = playerSetup.querySelector('[name = coat-color]');

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizardsFragment = document.createDocumentFragment();

  var createElement = function () {
    var randomBoolean = window.utils.getRandomBoolean();

    return {
      name: window.utils.getRandomArrayElement(randomBoolean ? NAMES : SURNAMES) + ' ' + window.utils.getRandomArrayElement(randomBoolean ? SURNAMES : NAMES),
      coatColor: window.utils.getRandomArrayElement(COAT_COLORS),
      eyesColor: window.utils.getRandomArrayElement(EYES_COLORS)
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

  var setPlayerPartColor = function (element, property, colors, output) {
    element.addEventListener('click', function () {
      output.value = element.style[property] = window.utils.getRandomArrayElement(colors);
    });
  };

  setPlayerPartColor(playerEyes, 'fill', EYES_COLORS, eyesColorInput);
  setPlayerPartColor(playerFireball, 'backgroundColor', FIREBALL_COLORS, fireballColorInput);
  setPlayerPartColor(playerCoat, 'fill', COAT_COLORS, coatColorInput);

  var data = createElements(WIZARDS_COUNT);
  renderWizards(data);

  setupSimilar.classList.remove('hidden');
})();
