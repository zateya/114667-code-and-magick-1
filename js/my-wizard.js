'use strict';

(function () {
  var WIZARD_WIDTH = 62;

  var playerSetup = document.querySelector('.setup-player');
  var playerEyes = playerSetup.querySelector('.wizard-eyes');
  var playerCoat = playerSetup.querySelector('.wizard-coat');
  var wizardName = document.querySelector('.setup-user-name');
  var eyesColorInput = playerSetup.querySelector('[name = eyes-color]');
  var coatColorInput = playerSetup.querySelector('[name = coat-color]');

  var wizard = new window.Wizard({name: wizardName.value});

  playerCoat.addEventListener('click', function () {
    coatColorInput.value = playerCoat.style.fill = wizard.changeCoatColor();
  });

  playerEyes.addEventListener('click', function () {
    eyesColorInput.value = playerEyes.style.fill = wizard.changeEyesColor();
  });

  document.querySelector('.setup-wizard-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    var wizardCopy = document.querySelector('svg').cloneNode(true);

    wizardCopy.querySelector('#wizard-coat').style.fill = playerCoat.style.fill;
    wizardCopy.querySelector('#wizard-eyes').style.fill = playerEyes.style.fill;

    var wizardBase64Right = window.svgtobase64(wizardCopy);

    // Чтобы развернуть мага, его надо подвинуть на его ширину, а затем отразить
    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(' + WIZARD_WIDTH + ', 0) scale(-1, 1)');
    var wizardBase64Left = window.svgtobase64(wizardCopy);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  window.myWizard = wizard;
})();
