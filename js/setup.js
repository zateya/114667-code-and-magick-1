'use strict';

(function () {
  var playerSetup = document.querySelector('.setup-player');
  var eyesColorInput = playerSetup.querySelector('[name = eyes-color]');
  var coatColorInput = playerSetup.querySelector('[name = coat-color]');

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColorInput.value = eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColorInput.value = coatColor = color;
    window.debounce(updateWizards);
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onLoad, window.backend.showError);
})();
