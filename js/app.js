const playBtns = document.querySelectorAll(".play-btn");
const music = document.querySelector('audio');
const playIcon = document.querySelector('.play-icon')
const playButton = document.querySelector('.play-button');
const forward = document.querySelector('.forward');
const backForward = document.querySelector('.back-forward');
const volumeCard = document.querySelector('.volume-card');
const volume = document.querySelector('.volume');
const processBar = document.querySelector('.process-bar');
const currentTime = document.querySelector('.current-time');
const likeBtn = document.querySelector('.like');
const muteBtn = document.querySelector('.muteBtn');
const muteIcon = document.querySelector('.muteIcon');

let musicVolume = 0;
muteBtn.addEventListener('click',function(){
    if(muteIcon.className.includes('fa-volume-up')){
        musicVolume = music.volume;
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
        music.volume = 0;
        volume.style.width = `${music.volume*100}px`;
    } else {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
        music.volume = musicVolume;
        volume.style.width = `${music.volume*100}px`;
    };
});
playBtns.forEach(function(playBtn){
    playBtn.addEventListener('click',function(event){
        const playOrPauseIcon = playBtn.querySelector('i');
        if(playOrPauseIcon.className.includes("fa-play")){
            const mainMusicSrc = event.target.dataset.src;
            music.setAttribute("src",mainMusicSrc);
            music.play();
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
            playBtns.forEach(function(playBtn){
                const playOrPauseIcon = playBtn.querySelector('i');
                playOrPauseIcon.classList.remove('fa-pause');
                playOrPauseIcon.classList.add('fa-play');
            });
            playOrPauseIcon.classList.remove('fa-play');
            playOrPauseIcon.classList.add('fa-pause');
        } else {
            music.pause();
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
            playOrPauseIcon.classList.remove('fa-pause');
            playOrPauseIcon.classList.add('fa-play');
        }
    });
});
playButton.addEventListener('click',function(){
    if(playIcon.className.includes('fa-play')){
        music.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
    } else {
        music.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
    }
    const musicPauseIcon = document.querySelector('.play-btn .fa-pause');
    musicPauseIcon.classList.remove('fa-pause');
});
volumeCard.addEventListener('click',function(event){
    music.volume = event.offsetX / 100;
    volume.style.width = `${event.offsetX}px`
    muteIcon.classList.remove('fa-volume-mute');
    muteIcon.classList.add('fa-volume-up');
});
music.addEventListener('timeupdate', function () {
  if (music.duration) {
    const progressPercent = (music.currentTime / music.duration) * 100;
    currentTime.style.width = `${progressPercent}%`;
  }
});
processBar.addEventListener('click', function (event) {
  const barWidth = processBar.clientWidth;
  const clickX = event.offsetX;
  const duration = music.duration;
  if (duration) {
    music.currentTime = (clickX / barWidth) * duration;
  };
});
likeBtn.addEventListener('click', function () {
  likeBtn.classList.toggle('active');
});