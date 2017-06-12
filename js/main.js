(() => {
  'use strict';

  var stage = document.getElementById('stage');
  var ctx;
  var count = 0;
  var dim;
  var size;
  var anser = [];
  var isPlaying = true;

  if (typeof stage.getContext === 'undefined') {
    return;
  }

  function init() {
    dim = Math.floor(count / 3) + 2;
    size = Math.floor(stage.width / dim);
    anser = [
      Math.floor(Math.random() * dim),
      Math.floor(Math.random() * dim)
    ];
  }

  function draw() {
    var x;
    var y;
    var offset = 2;
    var baseColor;
    var anserColor;
    var hue;
    var ligthness;

    hue = Math.random() * 360;
    baseColor = 'hsl(' + hue + ', 80%, 50%)';
    ligthness = Math.max(75 - count, 53);
    anserColor = 'hsl(' + hue + ', 80%, ' + ligthness + '%)';


    ctx.clearRect(0,0,stage.width,stage.height);
    for (x = 0; x < dim; x++) {
      for (y = 0; y < dim; y++) {

        if (anser[0] === x && anser[1] === y) {
          ctx.fillStyle = anserColor;
        } else {
          ctx.fillStyle = baseColor;
        }
        // ctx.fillStyle = 'rgba(255, 0, 0, ' + Math.random() + ')';
        ctx.fillRect(
          // 0, 50, 100, ...
          size * x + offset,
          size * y + offset,
          size - offset,
          size - offset
        );
      }
    }
  }
  ctx = stage.getContext('2d');

  stage.addEventListener('click', (e) => {
    let rect;
    let x;
    let y;
    const replay = document.getElementById('replay');
    if (isPlaying === false) {
      return;
    }
    rect = e.target.getBoundingClientRect();

    x = e.pageX - rect.left - window.scrollX;
    y = e.pageY - rect.top - window.scrollY;

    if (
      anser[0] === Math.floor(x / size) &&
      anser[1] === Math.floor(y / size)
    ) {
      count++;
      init();
      draw();
    } else {
      alert('your score :' + count);
      isPlaying = false;
      replay.className = '';
    }

  });

  init();
  draw();

})();
