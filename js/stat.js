'use strict';
var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var getBiggestNumber = function (numbers) {
  return Math.max.apply(null, numbers);
};

window.renderStatistics = function (ctx, names, times) {
  // Cloud:
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COLOR = '#ffffff';
  var SHADOW_GAP = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  // Text:
  var TEXT_LINE_HEIGHT = 18;
  var FONT_STYLE = '16px PT Mono';
  var FONT_COLOR = '#000000';
  var INTRO_CONTENT = ['Ура вы победили!', 'Список результатов:'];

  // RatingBars:
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BARS_BOTTOM = 250;
  var BAR_NUMBER = 4;
  var BAR_GAP = 50;
  var BAR_POSITION_LEFT = (CLOUD_WIDTH - BAR_NUMBER * BAR_WIDTH - (BAR_NUMBER - 1) * BAR_GAP) / 2;
  var USER_BAR_COLOR = 'rgb(255, 0, 0)';


  var getBlueWithRandomSaturation = function () {
    return 'hsl(240, ' + getRandomNumber(100) + '%, 50%)';
  };

  var renderCloud = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderDesk = function (x, y) {
    renderCloud(x + SHADOW_GAP, y + SHADOW_GAP, SHADOW_COLOR);
    renderCloud(x, y, CLOUD_COLOR);
  };

  var renderText = function (strings, x, y) {
    ctx.font = FONT_STYLE;
    ctx.fillStyle = FONT_COLOR;

    strings.forEach(function (string, index) {
      ctx.fillText(string, CLOUD_X + x, CLOUD_Y + y + (index * TEXT_LINE_HEIGHT));
    });
  };

  var renderIntro = function () {
    renderText(INTRO_CONTENT, 25, 28);
  };

  var renderBar = function (x, y, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(CLOUD_X + x, y, BAR_WIDTH, height);
  };

  var renderBars = function () {
    var USER_NAME_Y = BARS_BOTTOM + 5;
    var highestTime = getBiggestNumber(times);

    names.forEach(function (name, index) {
      var time = Math.floor(times[index]);
      var positionX = BAR_POSITION_LEFT + index * (BAR_WIDTH + BAR_GAP);
      var userBarColor = (name === 'Вы') ? USER_BAR_COLOR : getBlueWithRandomSaturation();
      var userBarHeight = BAR_HEIGHT * time / highestTime;
      var userTimeY = BARS_BOTTOM - userBarHeight - 15;

      renderText([name], positionX, USER_NAME_Y);
      renderText([time], positionX, userTimeY);
      renderBar(positionX, BARS_BOTTOM - userBarHeight, userBarHeight, userBarColor);
    });
  };

  var init = function () {
    renderDesk(CLOUD_X, CLOUD_Y);
    renderIntro(INTRO_CONTENT);
    renderBars(ctx, names, times);
  };

  init();
};
