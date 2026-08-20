const music = document.querySelector('audio');
const playIcon = document.querySelector('.play-icon');
const playButton = document.querySelector('.play-button');
const forwardBtn = document.querySelector('.forward');
const backBtn = document.querySelector('.back-forward');
const volumeCard = document.querySelector('.volume-card');
const volume = document.querySelector('.volume');
const processBar = document.querySelector('.process-bar');
const currentTime = document.querySelector('.current-time');
const likeBtn = document.querySelector('.like');
const musicName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist');
const muteBtn = document.querySelector('.muteBtn');
const muteIcon = document.querySelector('.muteIcon');

const playlist = [];
const musics = [
    {id:1 , title:"Aperture" , src:"./audios/Aperture - Harry Styles.mp3" , cover:"./images/Aperture - Harry Styles.png" , singer:"Harry Styles", isLiked:false},
    {id:2 , title:"Back To Back" , src:"./audios/Back To Black - Amy Winehouse.mp3" , cover:"./images/Back To Black - Amy Winehouse.jpg" , singer:"Amy Winehouse", isLiked:false},
    {id:3 , title:"Circles" , src:"./audios/Circles - Post Malone.mp3" , cover:"./images/Circles - Post Malone.jpg" , singer:"Post Melone", isLiked:false},
    {id:4 , title:"Gangsta's Paradise" , src:"./audios/Gangsta's Paradise - Coolio  L.V..mp3" , cover:"./images/Gangsta's Paradise - Coolio  L.V..png" , singer:"Collio & L.V.", isLiked:false},
    {id:5 , title:"River" , src:"./audios/River - Eminem  Ed Sheeran.mp3" , cover:"./images/River - Eminem  Ed Sheeran.jpg" , singer:"Eminem & Ed Sheeran", isLiked:false},
    {id:6 , title:"Still D.R.E." , src:"./audios/Still D.R.E. - Dr. Dre  Snoop Dogg.mp3" , cover:"./images/Still D.R.E. - Dr. Dre  Snoop Dogg.jpg" , singer:"Dr.Dre & Snoop Dogg", isLiked:false},
];

let currentPlayingMusic = null;
let musicVolume = 1;

const muteBtnHandler = () => {
        if(muteIcon.classList.contains('fa-volume-up')){
            musicVolume = music.volume;
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute');
            music.volume = 0;
            volume.style.width = `0px`;
        } else {
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.add('fa-volume-up');
            music.volume = musicVolume;
            volume.style.width = `${music.volume * 100}px`;
        }
};
const playButtonHandler = () => {
    if(playIcon.classList.contains('fa-play')){
        music.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
    } else {
        music.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
    }
};
const volumeCardHandler = (event) => {
    music.volume = event.offsetX / 100;
    volume.style.width = `${event.offsetX}px`;
    if (muteIcon) {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
    }
};
const musicHandler = () => {
    if (music.duration) {
        const progressPercent = (music.currentTime / music.duration) * 100;
        currentTime.style.width = `${progressPercent}%`;
    }
};
const processBarHandler = (event) => {
    const barWidth = processBar.clientWidth;
    const clickX = event.offsetX;
    if (music.duration) {
        music.currentTime = (clickX / barWidth) * music.duration;
    }
};
const likeBtnHandler = () => {
    if (currentPlayingMusic) {
        currentPlayingMusic.isLiked = !currentPlayingMusic.isLiked;
        if (currentPlayingMusic.isLiked) {
            likeBtn.classList.add('active');
        } else {
            likeBtn.classList.remove('active');
        }
    }
};
const showMusics = () => {
    const musicContainer = document.querySelector('.musics-container');
    musicContainer.innerHTML = '';
    musics.forEach((musicObj) => {
        musicContainer.insertAdjacentHTML('beforeend', 
            `
            <article class="music-card">
            <header>
                <img src="${musicObj.cover}" alt="کاور موزیک" />
                <div class="play-music">
                <button class="play-btn" data-src="${musicObj.src}">
                    <i class="fa fa-play"></i>
                </button>
                </div>
            </header>
            <main>
                <p>${musicObj.title} - ${musicObj.singer}</p>
            </main>
            <footer>
            <button class="bookmark ${musicObj.isInPlayList ? "bookmarked" : ""}" onclick="addToPlaylist(${musicObj.id})">
                <i class="fa-regular fa-bookmark"></i>
            </button>
            </footer>
            </article>
            `);
    });
    setupPlayButtons();
};
const setupPlayButtons = () => {
    const playBtns = document.querySelectorAll(".play-btn");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', () => {
            const playOrPauseIcon = playBtn.querySelector('i');
            const mainMusicSrc = playBtn.dataset.src;
            if(playOrPauseIcon.classList.contains("fa-play")){
                music.setAttribute("src", mainMusicSrc);
                music.play();
                playIcon.classList.remove("fa-play");
                playIcon.classList.add("fa-pause");
                currentPlayingMusic = musics.find(item => {
                    return item.src === mainMusicSrc;
                });
                if (currentPlayingMusic) {
                    musicName.textContent = currentPlayingMusic.title;
                    artistName.textContent = currentPlayingMusic.singer;
                    if (currentPlayingMusic.isLiked) {
                        likeBtn.classList.add('active');
                    } else {
                        likeBtn.classList.remove('active');
                    }
                };
                playBtns.forEach(playBtn => {
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
};
const addToPlaylist = (musicId) => {
    const mainMusic = musics.find(musicObj => {
        return musicObj.id === musicId;
    });
    if (mainMusic){
        if (mainMusic.isInPlayList) {
            removeFromPlaylist(musicId);
        } else {
            mainMusic.isInPlayList = true;
            playlist.push(mainMusic);
            showPlayList();
            showMusics();
        };
    };
};
const removeFromPlaylist = (musicId) => {
    const mainMusic = musics.find(musicObj => {
        return musicObj.id === musicId;
    });
    if (mainMusic) {
        mainMusic.isInPlayList = false;
    }
    const musicIndex = playlist.findIndex(musicObj => {
        return musicObj.id === musicId;
    });
    if (musicIndex !== -1) {
        playlist.splice(musicIndex, 1);
    }
    showPlayList();
    showMusics();
};
const showPlayList = () => {
    const playListContainer = document.querySelector('.playlist');
    playListContainer.innerHTML = '';
    if (playlist.length === 0) {
        playListContainer.innerHTML = 'موزیکی اضافه نشده';
        return;
    };
    playlist.forEach(musicObj => {
        playListContainer.insertAdjacentHTML('beforeend', 
            `
            <article class="music-card">
            <header>
                <img src="${musicObj.cover}" alt="کاور موزیک" />
                <div class="play-music">
                <button class="play-btn" data-src="${musicObj.src}">
                    <i class="fa fa-play"></i>
                </button>
                </div>
            </header>
            <main>
                <p>${musicObj.title} - ${musicObj.singer}</p>
            </main>
            <footer>
            <button class="bookmark bookmarked" onclick="addToPlaylist(${musicObj.id})">
                <i class="fa-regular fa-bookmark"></i>
            </button>
            </footer>
            </article>
            `);
    });
    setupPlayButtons();
};
const forwardBtnHandler = () => {
    let currentIndex = musics.findIndex(item => {
        return item.src === music.getAttribute('src');
    });
    let nextIndex = 0;
    if (currentIndex < 0) {
        nextIndex = 0;
    } else {
        nextIndex = (currentIndex + 1) % musics.length;
    }
    let targetMusic = musics[nextIndex];
    music.src = targetMusic.src;
    music.play();
    currentPlayingMusic = targetMusic;
    musicName.textContent = targetMusic.title;
    artistName.textContent = targetMusic.singer;
    if (targetMusic.isLiked) {
        likeBtn.classList.add('active');
    } else {
        likeBtn.classList.remove('active');
    }
    playIcon.className = "fa fa-pause play-icon";
};
const backBtnHandler = () => {
    let currentIndex = musics.findIndex(item => {
        return item.src === music.getAttribute('src');
    });

    let prevIndex = 0;
    if (currentIndex <= 0) {
        prevIndex = musics.length - 1;
    } else {
        prevIndex = currentIndex - 1;
    }

    let targetMusic = musics[prevIndex];

    music.src = targetMusic.src;
    music.play();
    currentPlayingMusic = targetMusic;
    musicName.textContent = targetMusic.title;
    artistName.textContent = targetMusic.singer;

    if (targetMusic.isLiked) {
        likeBtn.classList.add('active');
    } else {
        likeBtn.classList.remove('active');
    }

    playIcon.className = "fa fa-pause play-icon";
};

if (muteBtn) {
    muteBtn.addEventListener('click', muteBtnHandler);
}
playButton.addEventListener('click', playButtonHandler);
volumeCard.addEventListener('click', volumeCardHandler);
music.addEventListener('timeupdate', musicHandler);
processBar.addEventListener('click', processBarHandler);
likeBtn.addEventListener('click', likeBtnHandler);
forwardBtn.addEventListener('click', forwardBtnHandler);
backBtn.addEventListener('click', backBtnHandler);