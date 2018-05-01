'use strict';

(function () {
  var WIZARDS_COUNT = 4;
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

  window.render = function (data) {
    var elementsCount = data.length > WIZARDS_COUNT ? WIZARDS_COUNT : data.length;
    similarWizardsList.innerHTML = '';
    for (var i = 0; i < elementsCount; i++) {
      wizardsFragment.appendChild(renderWizard(data[i]));
    }

    similarWizardsList.appendChild(wizardsFragment);
  };

  setupSimilar.classList.remove('hidden');
})();
