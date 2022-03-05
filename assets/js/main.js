document.addEventListener("DOMContentLoaded", function() {

  const playBtn = document.querySelector('#btn-play-music');
  const audio = document.querySelector('audio');
  const timeline = document.querySelector('.timeline');
  const soundButton = document.querySelector('#sound-button');

  playBtn.addEventListener('click', function() {
    const isPause = audio.paused;
    const icon = isPause ? 'pause' : 'play-circle';

    this.innerHTML = `<i class="bi bi-${icon}" style="font-size: 28px"></i>`
    if (isPause) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.ontimeupdate = changeTimelinePosition;
  function changeTimelinePosition () {
    const percentagePosition = (100*audio.currentTime) / audio.duration;
    timeline.style.backgroundSize = `${percentagePosition}% 100%`;
    timeline.value = percentagePosition;
  }

  timeline.addEventListener('change', changeSeek);
  function changeSeek () {
    const time = (timeline.value * audio.duration) / 100;
    audio.currentTime = time;
  }

  // audio.onended = endSong;
  // function endSong() {
  //   playBtn.innerHTML = '<i class="bi bi-play-circle" style="font-size: 28px"></i>';
  // };

  var off = (myRange.clientWidth) / (parseInt(myRange.max) - parseInt(myRange.min));
  var px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.clientWidth / 2);
  myValue.style.left = px + 'px';

  myRange.oninput = function() {
    let px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.clientWidth / 2);
    myValue.style.left = px + 'px';
    audio.volume = myRange.value * 0.01;
  };

  myRange.addEventListener('click', function() {
    if ((this).value == 0) {
      audio.muted = !audio.muted;
      addAndRemoveIcon('up', 'mute', iconVolumn);
    } else {
      audio.muted = false;
      addAndRemoveIcon('mute', 'up', iconVolumn);
    }
  });
  function addAndRemoveIcon(currentIcon, changeIcon, element) {
    element.classList.remove(`bi-volume-${currentIcon}-fill`);
    element.classList.add(`bi-volume-${changeIcon}-fill`);
  }

  iconVolumn.addEventListener('click', function () {
    audio.muted = !audio.muted;
    if (audio.muted) {
      addAndRemoveIcon('up', 'mute', this);
    } else {
      addAndRemoveIcon('mute', 'up', this);
      audio.volume = 0.8;
      myRange.value = 80;
      myValue.style.left = 60 + 'px';
    }
  });

  const prePathFile = 'http://127.0.0.1:5500/assets/file/';
  var arrSong = [
    `${prePathFile}Chay-Ve-Khoc-Voi-Anh-ERIK.mp3`,
    `${prePathFile}They-Said-Touliver-Binz.mp3`,
    `${prePathFile}25-Tao-Sol-Bass-Young-H.mp3`,
  ];
  const prePathImange = 'http://127.0.0.1:5500/assets/image/'
  var arrImage = [
    `${prePathImange}erik.png`,
    `${prePathImange}bg.jpg`,
    `${prePathImange}25.png`,
  ];
  const bgImage = document.querySelector('#background-image');

  nextSong.addEventListener('click', function () {
    changeSong();
  });

  preSong.addEventListener('click', function () {
    changeSong();
  });

  var temp = 0;
  function changeSong() {
    const currentSrc = audio.src;
    const totalSong = arrSong.length - 1;
    if (temp != 0) {
      temp += 1
      audio.src = arrSong[temp];
      bgImage.src = arrImage[temp];
    }
    if (temp == 0) {
      temp += 1
      audio.src = arrSong[temp];
      bgImage.src = arrImage[temp];
    }
    if (temp > totalSong) {
      temp = 0
      audio.src = arrSong[temp];
      bgImage.src = arrImage[temp];
    }
    audio.play();
  }

  const btnShuffle = document.querySelector('#btn-shuffle-song');

  btnShuffle.addEventListener('click', function () {
    var randNumber = Math.floor(Math.random() * 3)
    arrSong.sort((a, b) => 0.5 - Math.random());

    audio.src = arrSong[randNumber];
    bgImage.src = arrImage[randNumber];
    audio.play();
  });

  const btnRepeat = document.querySelector('#btn-repeat');
  var repeatSong = false;
  btnRepeat.addEventListener('click', function () {
    repeatSong = !repeatSong;
  });

  audio.onended = repeatOrStop;
  function repeatOrStop(params) {
    if (repeatSong == true) {
      playBtn.innerHTML = '<i class="bi bi-pause" style="font-size: 28px"></i>';
      audio.play();
    } else {
      playBtn.innerHTML = '<i class="bi bi-play-circle" style="font-size: 28px"></i>';
    }
  }
});
