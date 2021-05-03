const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleBtn = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); // everything that has a data-skip attribute.
const ranges = player.querySelectorAll('.player__slider');
const expandButton = player.querySelector('.expand')


const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

const updatePlayButton = () => {
  const icon = video.paused ? '►' : '❚ ❚';
  toggleBtn.innerHTML = icon;
};

const skipTime = (event) => {
  video.currentTime += parseFloat(event.target.dataset.skip);
};

const handleRangeUpdate = (event) => {
  video[event.target.name] = event.target.value;
};

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrubVideo = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const openFullscreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
toggleBtn.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skipTime));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrubVideo);
progress.addEventListener('mousemove', (event) => mousedown && scrubVideo(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
expandButton.addEventListener('click', openFullscreen);