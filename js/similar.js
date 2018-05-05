'use strict';

(function () {
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var getNamesSort = function (leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  };

  var getWizardsSort = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? getNamesSort(left.name, right.name) : rankDiff;
  };

  var updateFilter = function () {
    window.render(wizards.sort(getWizardsSort));
  };

  window.myWizard.onChange = function () {
    updateFilter();
  };

  var onLoad = function (data) {
    wizards = data;
    updateFilter();
  };

  window.backend.load(onLoad, window.backend.showError);

})();
