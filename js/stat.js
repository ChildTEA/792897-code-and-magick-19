'use strict';

// Cloud:
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;

// Text:
var LINE_HEIGHT = 18;
var TEXT_MARGIN_TOP = 10;
var LEFT_MARGIN = 25;
var INTRO_HEIGHT = 50;
var INTRO_MARGIN_BOTTOM = 20;

// RatingBars:
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_NUMBER = 4;
var BAR_GAP = 50;
var BAR_MARGIN_LEFT = (CLOUD_WIDTH - BAR_NUMBER * BAR_WIDTH - (BAR_NUMBER - 1) * BAR_GAP) / 2;
var USER_BAR_COLOR = 'rgb(255, 0, 0)';

var getLargestNumber = function (nums) {
  var highest = nums[0];

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > highest) {
      highest = nums[i];
    }
  }
  return highest;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderNames = function (ctx, names) {
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + BAR_MARGIN_LEFT + i * (BAR_WIDTH + BAR_GAP), INTRO_HEIGHT + INTRO_MARGIN_BOTTOM + LINE_HEIGHT + (LINE_HEIGHT / 2) + BAR_HEIGHT + LINE_HEIGHT);
  }
};

var renderBars = function (ctx, names, times) {
  var highestTime = getLargestNumber(times);

  for (var i = 0; i < names.length; i++) {
    var currentBarHeigth = (BAR_HEIGHT * times[i]) / highestTime;
    var topBarGap = BAR_HEIGHT - currentBarHeigth;
    var positionX = CLOUD_X + BAR_MARGIN_LEFT + i * (BAR_WIDTH + BAR_GAP);
    var textPositionY = INTRO_HEIGHT + INTRO_MARGIN_BOTTOM + LINE_HEIGHT + topBarGap;
    var positionY = textPositionY + LINE_HEIGHT / 2;

    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(positionX, positionY, BAR_WIDTH, currentBarHeigth);

    ctx.fillStyle = '#000000';
    var timeToPrint = Math.round(times[i]);
    ctx.fillText(timeToPrint, positionX, textPositionY);
  }
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';

  ctx.fillText('Ура вы победили!', CLOUD_X + LEFT_MARGIN, CLOUD_Y + TEXT_MARGIN_TOP + LINE_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + LEFT_MARGIN, CLOUD_Y + TEXT_MARGIN_TOP + 2 * LINE_HEIGHT);

  renderNames(ctx, names);
  renderBars(ctx, names, times);
};
