const playBtns = document.querySelectorAll(".play-btn");

playBtns.forEach(function(playBtn){
    playBtn.addEventListener('click',function(event){
        event.target.dataset.src.play();
    });
});