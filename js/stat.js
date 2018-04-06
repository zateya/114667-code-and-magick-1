'use strict';

var Cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  SHADOW_OFFSET: 10,
  COLOR: 'rgba(255, 255, 255, 1)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  LINE_OFFSET: 10
};

var TextInfo = {
  FONT: '16px PT Mono',
  COLOR: 'rgba(0, 0, 0, 1)',
  GAP: 20
};

var Bar = {
  WIDTH: 40,
  GAP: 50,
  USER_COLOR: 'rgba(255, 0, 0, 1)',
  PLAYERS_COLOR: 'hsl(240, 50%, 50%)',
  PLAYERS_MIN_SATURATION: 0,
  PLAYERS_MAX_SATURATION: 100
};

var HISTOGRAM_HEIGHT = 150;

var getRandomFromRange = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

var getPlayerBarColor = function (hslColor) {
  var arr = hslColor.substring(4, hslColor.length - 1).split(','); // оставляем в строке только цифры через запятую и преобразуем в массив

  return 'hsl(' + arr[0] + ', ' + getRandomFromRange(Bar.PLAYERS_MIN_SATURATION, Bar.PLAYERS_MAX_SATURATION) + '%, ' + arr[2] + ')';
};

var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

var renderCloud = function (ctx, x, y, width, height, lineOffset) {
  var offset = lineOffset || Cloud.LINE_OFFSET;

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
  ctx.fillStyle = color || TextInfo.COLOR;
  ctx.font = font || TextInfo.FONT;
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

  ctx.fillStyle = Cloud.SHADOW_COLOR;
  renderCloud(ctx, Cloud.X + Cloud.SHADOW_OFFSET, Cloud.Y + Cloud.SHADOW_OFFSET, Cloud.WIDTH, Cloud.HEIGHT);

  ctx.fillStyle = Cloud.COLOR;
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);

  renderText(ctx, 'Ура вы победили!', Cloud.X + TextInfo.GAP, Cloud.Y + TextInfo.GAP * 2);
  renderText(ctx, 'Список результатов:', Cloud.X + TextInfo.GAP, Cloud.Y + TextInfo.GAP * 3);

  var barStep = HISTOGRAM_HEIGHT / getMaxOfArray(times);

  var histogramX = Cloud.X + (Cloud.WIDTH - Bar.WIDTH * players.length - Bar.GAP * (players.length - 1)) / 2;
  var histogramY = Cloud.Y + TextInfo.GAP * 4;

  players.forEach(function (player, j) {
    var barHeight = player.time * barStep - 2 * TextInfo.GAP;
    var barX = histogramX + j * (Bar.WIDTH + Bar.GAP);
    var barY = histogramY + HISTOGRAM_HEIGHT - barHeight - TextInfo.GAP;
    var barColor = player.name === 'Вы' ? Bar.USER_COLOR : getPlayerBarColor(Bar.PLAYERS_COLOR);
    drawRect(ctx, barX, barY, Bar.WIDTH, barHeight, barColor);
    renderText(ctx, Math.round(player.time), barX, barY - TextInfo.GAP / 2);
    renderText(ctx, player.name, barX, histogramY + HISTOGRAM_HEIGHT);
  });
};
