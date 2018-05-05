'use strict';

(function () {
  var setupParam = {
    WIDTH: 800,
    TOP: 80
  };
  var setup = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifatsCells = document.querySelectorAll('.setup-artifacts .setup-artifacts-cell');
  var draggedItem = null;

  setupParam.HALF_WIDTH = setupParam.WIDTH / 2;

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

  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };

  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._constraints = constraints;
  };

  Coordinate.prototype = {
    setX: function (x) {
      if (x >= this._constraints.left && x <= this._constraints.right) {
        this.x = x;
      }
    },
    setY: function (y) {
      if (y >= this._constraints.top && y <= this._constraints.bottom) {
        this.y = y;
      }
    }
  };

  var onDialogHandleDragStart = function (evt) {
    evt.preventDefault();
    var setupCoord = new Coordinate(setup.offsetLeft, setup.offsetTop, new Rect(setupParam.HALF_WIDTH, 0, document.body.offsetWidth - setupParam.HALF_WIDTH, setupParam.TOP));
    var cursorCoord = new Coordinate(evt.clientX, evt.clientY);
    var moved = false;

    var onDialogHandleMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      moved = true;

      var shift = new Coordinate(cursorCoord.x - moveEvt.clientX, cursorCoord.y - moveEvt.clientY);
      cursorCoord.x = moveEvt.clientX;
      cursorCoord.y = moveEvt.clientY;

      setupCoord.setX(setup.offsetLeft - shift.x);
      setupCoord.setY(setup.offsetTop - shift.y);

      setup.style.left = setupCoord.x + 'px';
      setup.style.top = setupCoord.y + 'px';
    };

    var onDialogHandleMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDialogHandleMouseMove);
      document.removeEventListener('mouseup', onDialogHandleMouseUp);

      if (moved) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          moved = false;
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onDialogHandleMouseMove);
    document.addEventListener('mouseup', onDialogHandleMouseUp);
  };

  dialogHandle.addEventListener('dragstart', onDialogHandleDragStart);

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

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(setupForm), function () {
      setup.classList.add('hidden');
    }, window.backend.showError);
  });
})();
