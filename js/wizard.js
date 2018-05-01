'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var playerSetup = document.querySelector('.setup-player');
  var playerEyes = playerSetup.querySelector('.wizard-eyes');
  var playerCoat = playerSetup.querySelector('.wizard-coat');

  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };

  playerCoat.addEventListener('click', function () {
    var newColor = window.utils.getRandomArrayElement(COAT_COLORS);
    playerCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  playerEyes.addEventListener('click', function () {
    var newColor = window.utils.getRandomArrayElement(EYES_COLORS);
    playerEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = wizard;
})();
