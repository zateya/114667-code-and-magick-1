'use strict';

(function () {
  var HISTOGRAM_HEIGHT = 150;

  var cloud = {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
    shadowOffset: 10,
    color: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    lineOffset: 10
  };

  var textInfo = {
    font: '16px PT Mono',
    color: 'rgba(0, 0, 0, 1)',
    gap: 20
  };

  var bar = {
    width: 40,
    gap: 50,
    userColor: 'rgba(255, 0, 0, 1)',
    playersColor: 'hsl(240, 50%, 50%)',
    playersMinSaturation: 0,
    playersMaxSaturation: 100
  };

  var getRandomFromRange = function (minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  };

  var getPlayerBarColor = function (hslColor) {
    var arr = hslColor.substring(4, hslColor.length - 1).split(','); // оставляем в строке только цифры через запятую и преобразуем в массив

    return 'hsl(' + arr[0] + ', ' + getRandomFromRange(bar.playersMinSaturation, bar.playersMaxSaturation) + '%, ' + arr[2] + ')';
  };

  var getMaxOfArray = function (numArray) {
    return Math.max.apply(null, numArray);
  };

  var renderCloud = function (ctx, x, y, width, height, lineOffset) {
    var offset = lineOffset || cloud.lineOffset;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + offset, y + height / 2);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width / 2, y + height - offset);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width - offset, y + height / 2);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + offset);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  };

  var drawRect = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color || 'transparent';
    ctx.fillRect(x, y, width, height);
  };

  var renderText = function (ctx, text, x, y, font, color) {
    ctx.fillStyle = color || textInfo.color;
    ctx.font = font || textInfo.font;
    ctx.fillText(text, x, y);
  };

  window.renderStatistics = function (ctx, names, times) {
    var players = [];

    for (var i = 0; i < times.length; i++) {
      players[i] = {};
      players[i].name = names[i];
      players[i].time = times[i];
    }

    players.sort(function (a, b) {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      return 0;
    });

    ctx.fillStyle = cloud.shadowColor;
    renderCloud(ctx, cloud.x + cloud.shadowOffset, cloud.y + cloud.shadowOffset, cloud.width, cloud.height);

    ctx.fillStyle = cloud.color;
    renderCloud(ctx, cloud.x, cloud.y, cloud.width, cloud.height);

    renderText(ctx, 'Ура вы победили!', cloud.x + textInfo.gap, cloud.y + textInfo.gap * 2);
    renderText(ctx, 'Список результатов:', cloud.x + textInfo.gap, cloud.y + textInfo.gap * 3);

    var barStep = HISTOGRAM_HEIGHT / getMaxOfArray(times);

    var histogramX = cloud.x + (cloud.width - bar.width * players.length - bar.gap * (players.length - 1)) / 2;
    var histogramY = cloud.y + textInfo.gap * 4;

    players.forEach(function (player, j) {
      var barHeight = player.time * barStep - 2 * textInfo.gap;
      var barX = histogramX + j * (bar.width + bar.gap);
      var barY = histogramY + HISTOGRAM_HEIGHT - barHeight - textInfo.gap;
      var barColor = player.name === 'Вы' ? bar.userColor : getPlayerBarColor(bar.playersColor);
      drawRect(ctx, barX, barY, bar.width, barHeight, barColor);
      renderText(ctx, Math.round(player.time), barX, barY - textInfo.gap / 2);
      renderText(ctx, player.name, barX, histogramY + HISTOGRAM_HEIGHT);
    });
  };

})();
