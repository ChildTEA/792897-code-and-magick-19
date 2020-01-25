'use strict';
var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var getBiggestNumber = function (numbers) {
  return Math.max.apply(null, numbers);
};

window.renderStatistics = function (ctx, names, times) {
  // Cloud:
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_GAP = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  // Text:
  var LINE_HEIGHT = 18;
  var TEXT_MARGIN_TOP = 10;
  var TEXT_MARGIN_LEFT = 25;
  var INTRO_HEIGHT = 50;
  var INTRO_MARGIN_BOTTOM = 20;
  var INTRO_FIRST_STRING_CONTENT = 'Ура вы победили!';
  var INTRO_SECOND_STRING_CONTENT = 'Список результатов:';

  // RatingBars:
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_NUMBER = 4;
  var BAR_GAP = 50;
  var BAR_MARGIN_LEFT = (CLOUD_WIDTH - BAR_NUMBER * BAR_WIDTH - (BAR_NUMBER - 1) * BAR_GAP) / 2;
  var USER_BAR_COLOR = 'rgb(255, 0, 0)';

  var renderCloud = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderCongratulation = function (firstStr, secondStr) {
    ctx.fillText(firstStr, CLOUD_X + TEXT_MARGIN_LEFT, CLOUD_Y + TEXT_MARGIN_TOP + LINE_HEIGHT);
    ctx.fillText(secondStr, CLOUD_X + TEXT_MARGIN_LEFT, CLOUD_Y + TEXT_MARGIN_TOP + 2 * LINE_HEIGHT);
  };


  var renderNames = function () {
    for (var i = 0; i < names.length; i++) {
      ctx.fillText(names[i], CLOUD_X + BAR_MARGIN_LEFT + i * (BAR_WIDTH + BAR_GAP), INTRO_HEIGHT + INTRO_MARGIN_BOTTOM + LINE_HEIGHT + (LINE_HEIGHT / 2) + BAR_HEIGHT + LINE_HEIGHT);
    }
  };

  var renderBars = function () {
    var highestTime = getBiggestNumber(times);

    for (var i = 0; i < names.length; i++) {
      var currentBarHeight = (BAR_HEIGHT * times[i]) / highestTime;
      var topBarGap = BAR_HEIGHT - currentBarHeight;
      var positionX = CLOUD_X + BAR_MARGIN_LEFT + i * (BAR_WIDTH + BAR_GAP);
      var textPositionY = INTRO_HEIGHT + INTRO_MARGIN_BOTTOM + LINE_HEIGHT + topBarGap;
      var positionY = textPositionY + LINE_HEIGHT / 2;

      ctx.fillStyle = (names[i] === 'Вы') ? (USER_BAR_COLOR) : ('hsl(240, ' + getRandomNumber(100) + '%, 50%)');

      ctx.fillRect(positionX, positionY, BAR_WIDTH, currentBarHeight);

      ctx.fillStyle = '#000000';
      var timeToPrint = Math.round(times[i]);
      ctx.fillText(timeToPrint, positionX, textPositionY);
    }
  };

  renderCloud(CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';

  var init = function () {
    renderCongratulation(INTRO_FIRST_STRING_CONTENT, INTRO_SECOND_STRING_CONTENT);
    renderNames(ctx, names);
    renderBars(ctx, names, times);
  };

  init();
};
