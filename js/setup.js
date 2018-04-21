'use strict';

(function () {
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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (data) {
    var wizards = data.slice();
    wizards.length = WIZARDS_COUNT;
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

  setupSimilar.classList.remove('hidden');


  window.backend.load(onLoad, window.backend.showError);
})();
