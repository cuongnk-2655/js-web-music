document.addEventListener("DOMContentLoaded", function() {

  const playBtn = document.querySelector('#btn-play-music');
  const audio = document.querySelector('audio');
  const timeline = document.querySelector('.timeline');
  const soundButton = document.querySelector('#sound-button');

  playBtn.addEventListener('click', function() {
    const isPause = audio.paused;
    const icon = isPause ? 'pause' : 'play-circle';

    this.innerHTML = `<i class="bi bi-${icon}" style="font-size: 35px"></i>`
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

  // soundButton.addEventListener('click', toggleSound);
  // function toggleSound () {
  //   audio.muted = !audio.muted;
  //   soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
  // }

  audio.onended = endSong;
  function endSong() {
    playBtn.innerHTML = '<i class="bi bi-play-circle" style="font-size: 35px"></i>';
  };
});
