'use strict';

(function () {
  var artifactsBlock = document.querySelector('.similar-artifacts');

  var renderArtifact = function (artifactData) {
    var artifactElement = document.createElement('li');

    artifactElement.classList.add('artifacts-item');
    artifactElement.textContent = artifactData.description;

    return artifactElement;
  };

  var renderArtifacts = function (data) {
    var artifactsFragment = document.createDocumentFragment();
    var artifacts = data;

    artifacts.forEach(function (artifact) {
      artifactsFragment.appendChild(renderArtifact(artifact));
    });

    return artifactsFragment;
  };

  var showArtifacts = function (data) {
    artifactsBlock.classList.remove('hidden');
    artifactsBlock.innerHTML = '';

    var artifactsList = document.createElement('ul');
    artifactsList.classList.add('artifacts-list');
    artifactsList.appendChild(renderArtifacts(data));
    artifactsBlock.appendChild(artifactsList);
  };

  var hideArtifacts = function () {
    artifactsBlock.classList.add('hidden');
  };

  window.similarArtifacts = {
    show: showArtifacts,
    hide: hideArtifacts
  };
})();
