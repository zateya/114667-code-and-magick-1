'use strict';

(function () {
  var SETUP_MIN_TOP = 0;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.setup-user-pic');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifatsCells = document.querySelectorAll('.setup-artifacts .setup-artifacts-cell');
  var draggedItem = null;

  var showEmptyCells = function () {
    [].forEach.call(artifatsCells, function (cell) {
      if (!cell.hasChildNodes()) {
        cell.style.outline = '2px dashed red';
      }
    });
  };

  var hideEmptyCells = function () {
    [].forEach.call(artifatsCells, function (cell) {
      cell.style.outline = '';
    });
  };

  var isImg = function (element) {
    return element.tagName.toLowerCase() === 'img';
  };

  shopElement.addEventListener('dragstart', function (evt) {
    if (isImg(evt.target)) {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      showEmptyCells();
    }
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    if (isImg(evt.target)) {
      showEmptyCells();
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  var isArtifactsCellEmpty = function (element) {
    return !element.hasChildNodes() && !isImg(element);
  };

  artifactsElement.addEventListener('drop', function (evt) {
    if (isArtifactsCellEmpty(evt.target)) {
      evt.target.style.backgroundColor = '';
      var draggedItemCopy = draggedItem.cloneNode(true);
      evt.target.appendChild(draggedItemCopy);
      hideEmptyCells();
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    if (isArtifactsCellEmpty(evt.target)) {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  var setupDefaultTop = parseInt(window.getComputedStyle(setup, null).getPropertyValue('top'), 10);
  var setupHalfWidth = parseInt(window.getComputedStyle(setup, null).getPropertyValue('width'), 10) / 2;

  var getDragArea = function () {
    return {
      xMin: setupHalfWidth,
      xMax: document.body.offsetWidth - setupHalfWidth,
      yMin: SETUP_MIN_TOP,
      yMax: setupDefaultTop
    };
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragArea = getDragArea();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: setup.offsetLeft - shift.x,
        y: setup.offsetTop - shift.y
      };

      if (currentCoords.x < dragArea.xMin) {
        currentCoords.x = dragArea.xMin;
      } else if (currentCoords.x > dragArea.xMax) {
        currentCoords.x = dragArea.xMax;
      }

      if (currentCoords.y < dragArea.yMin) {
        currentCoords.y = dragArea.yMin;
      } else if (currentCoords.y > dragArea.yMax) {
        currentCoords.y = dragArea.yMax;
      }

      setup.style.top = currentCoords.y + 'px';
      setup.style.left = currentCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onPopupEscPress = function (evt) {
    if (evt.target !== userNameInput) {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
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

  dialogHandle.style.zIndex = '1';
})();
