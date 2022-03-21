document.addEventListener("DOMContentLoaded", function() {

  const audio = document.querySelector('audio');
  const timeline = document.querySelector('.timeline');
  const soundButton = document.querySelector('#sound-button');

  const playBtn = document.querySelector('#btn-play-music');
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

  const timeline = document.querySelector('.timeline');
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

  const myRange = document.querySelector('#volunm-range');
  const myValue = document.querySelector('#myValue');
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

  const iconVolumn = document.querySelector('.btn-volumn-m');
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
  const prePathImange = 'http://127.0.0.1:5500/assets/image/';
  var arrSong = [
    {
      src: `${prePathFile}They-Said-Touliver-Binz.mp3`,
      image: `${prePathImange}bg.jpg`,
      name: "They said",
      singer: "Binz"
    },
    {
      src: `${prePathFile}25-Tao-Sol-Bass-Young-H.mp3`,
      image: `${prePathImange}25.png`,
      name: "25",
      singer: "Táo"
    },
    {
      src: `${prePathFile}Hen-Mot-Mai-4-Nam-2-Chang-1-Tinh-Yeu-OST-Bui-Anh-Tuan.mp3`,
      image: `${prePathImange}bbb.png`,
      name: "Hẹn một mai",
      singer: "Bùi Anh Tuấn"
    },
  ];

  const nextSong = document.querySelector('#btn-next-song');
  nextSong.addEventListener('click', function () {
    next_song();
    $('.image-song').slick('slickNext');
  });

  const preSong = document.querySelector('#btn-pre-song');
  preSong.addEventListener('click', function () {
    pre_song();
    $('.image-song').slick('slickPrev');
  });

  const bgImage = document.querySelector('#background-image');
  const nameSong = document.querySelector('.name-song');
  const namsSinger = document.querySelector('.name-singer');
  const imgSmall = document.querySelector('.img-small');

  var temp = 0;
  function next_song() {
    const totalSong = arrSong.length - 1;
    
    if (temp == 0) {
      temp = 1
      handleChangeSong();
    } else if (temp != 0) {
      temp += 1
      if (temp > totalSong) {
        temp = 0
        handleChangeSong();
      } else {
        handleChangeSong();
      }
    }
    playBtn.innerHTML = `<i class="bi bi-pause" style="font-size: 28px"></i>`;
    audio.play();
  }
  function pre_song() {
    const totalSong = arrSong.length - 1;
    
    if (temp == 0) {
      temp = totalSong
      handleChangeSong();
    } else if (temp != 0) {
      temp -= 1
      if (temp > totalSong) {
        temp = 0
        handleChangeSong();
      } else {
        handleChangeSong();
      }
    }
    playBtn.innerHTML = `<i class="bi bi-pause" style="font-size: 28px"></i>`;
    audio.play();
  }
  function handleChangeSong(params) {
    audio.src = arrSong[temp].src;
    bgImage.src = arrSong[temp].image;
    nameSong.textContent = arrSong[temp].name;
    namsSinger.textContent = arrSong[temp].singer;
    imgSmall.src = arrSong[temp].image;
  }

  const btnShuffle = document.querySelector('#btn-shuffle-song');

  btnShuffle.addEventListener('click', function () {
    var randNumber = Math.floor(Math.random() * 3)
    arrSong.sort((a, b) => 0.5 - Math.random());

    audio.src = arrSong[randNumber].src;
    bgImage.src = arrSong[randNumber].image;
    playBtn.innerHTML = `<i class="bi bi-pause" style="font-size: 28px"></i>`;
    audio.play();
  });

  const btnRepeat = document.querySelector('#btn-repeat');
  var repeatSong = false;
  btnRepeat.addEventListener('click', function () {
    repeatSong = !repeatSong;
    if (repeatSong) {
      this.style.backgroundColor = "red";
    } else {
      this.style.backgroundColor = "#f1f3f4"
    }
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

  $('.image-song').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.playlist-song'
  });
  $('.playlist-song').slick({
    slidesToShow: 2,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.image-song',
    centerMode: true,
    focusOnSelect: true,
    arrows: false
  });
});
