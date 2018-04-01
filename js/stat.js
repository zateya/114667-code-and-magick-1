'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_OFFSET = 10;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_LINE_OFFSET = 10;

var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
var TEXT_GAP = 20;

var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var PLAYERS_BAR_COLOR = 'rgba(2, 14, 134, 1)';
var PLAYERS_BAR_MIN_ALPHA = 0.3;

var getRandomFromRange = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

var getPlayerBarColor = function (rgbaColor) {
  var arr = rgbaColor.substring(5, rgbaColor.length - 1).split(','); // оставляем в строке только цифры через запятую и преобразуем в массив
  arr.length = 3; // обрезаем последний элемент массива

  return 'rgba(' + arr.join(',') + ', ' + getRandomFromRange(PLAYERS_BAR_MIN_ALPHA, 1) + ')';
};

var getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
};

var renderCloud = function (ctx, x, y, width, height, lineOffset) {
  var offset = lineOffset || CLOUD_LINE_OFFSET;

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
  ctx.fillStyle = color || TEXT_COLOR;
  ctx.font = font || TEXT_FONT;
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

  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_COLOR;
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  renderText(ctx, 'Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 2);
  renderText(ctx, 'Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 3);

  var barStep = HISTOGRAM_HEIGHT / getMaxOfArray(times);

  var histogramX = CLOUD_X + (CLOUD_WIDTH - BAR_WIDTH * players.length - BAR_GAP * (players.length - 1)) / 2;
  var histogramY = CLOUD_Y + TEXT_GAP * 4;

  for (var j = 0; j < players.length; j++) {
    var barHeight = players[j].time * barStep - 2 * TEXT_GAP;
    var barX = histogramX + j * (BAR_WIDTH + BAR_GAP);
    var barY = histogramY + HISTOGRAM_HEIGHT - barHeight - TEXT_GAP;
    var barColor = players[j].name === 'Вы' ? USER_BAR_COLOR : getPlayerBarColor(PLAYERS_BAR_COLOR);
    drawRect(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
    renderText(ctx, Math.round(players[j].time), barX, barY - TEXT_GAP / 2);
    renderText(ctx, players[j].name, barX, histogramY + HISTOGRAM_HEIGHT);
  }
};
