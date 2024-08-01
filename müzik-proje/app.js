const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controlls #prev");
const play = document.querySelector("#controlls #play");
const next = document.querySelector("#controlls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("#music-list");
const müziklistesi = document.querySelector("#müzik-listesi2");


const player = new musicPlayer(musicList);


window.addEventListener( "load", () => { //sayfa açılır açılmaz müziği gösterdik
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayNow();
    musiclist2(player.musicList);
});

function displayMusic(music){
      title.innerText = music.getName();
      singer.innerText = music.singer;
      image.src = "img/" + music.img; 
      audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})


function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
      audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
     audio.play();
}
const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

next.addEventListener('click', function (e) {
    e.preventDefault();
    player.next();
    displayMusic(player.getMusic());
    isPlayNow();
    });

prev.addEventListener("click",function(i){
    i.preventDefault();
    player.previous();
    displayMusic(player.getMusic())
    isPlayNow();
});

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye/60);
    const saniye = Math.floor(toplamSaniye % 60);
    const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `0${saniye}`;
    const sonuc = `${dakika} : ${saniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
        duration.textContent = calculateTime(audio.duration);
        progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});
volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value/100;
    if(value == 0){
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark"  
    }else{  
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
})

let sesDurumu = "sesli";
volume.addEventListener("click", () =>{
     if(sesDurumu === "sesli"){
            audio.muted = true;
            sesDurumu = "sessiz";
            volume.classList = "fa-solid fa-volume-xmark"
            volumeBar.value = 0;
     }else{
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
     }
});

const displayMusicList = (list) =>{
           for(let i=0; i < list.length; i++) {
            let liTag = `
            <li li-index="${i}"  onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
            `;
            ul.insertAdjacentHTML("beforeend", liTag);
            let liAudioDuration = ul.querySelector(`#music-${i}`);
            let liAudioTag = ul.querySelector(`.music-${i}`);
               
            liAudioTag.addEventListener("loadeddata", () => {
             
            })
        
          
           }
}

 const selectedMusic = (li) =>{
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayNow();
 };

 const isPlayNow = () =>{
     for(let li of ul.querySelectorAll("li")){
         if(li.classList.contains("playing")){
             li.classList.remove("playing");
         }
       if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
         }
    }
 }
audio .addEventListener("ended", () => {
    nextMusic();
})


// yan listeden seçilen müziklerin fonksiyonu
const musiclist2 = (liste) =>{
     for(let i = 0; i < liste.length; i++) {
        let listeTag = `
        <li  li-index ="${i}" onclick="selectedMusic(this)" class="list-group-item">
        <span>${liste[i].getName()}</span>
        <audio class="music-${i}" src="mp3/${liste[i].file}"></audio>
            <i  class="fa-solid fa-play mx-2"></i>
        </li>
        `
        müziklistesi.insertAdjacentHTML("beforeend",listeTag);
        let liAudioDuration = müziklistesi.querySelector(`#music-${i}`);
        let liAudioTag = müziklistesi.querySelector(`.music-${i}`);
           
        liAudioTag.addEventListener("loadeddata", () => {
         
        })
     }
}
const selectMusic = (li) =>{
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlay();
 };
 const isPlay = () =>{
    for(let li of müziklistesi.querySelectorAll("li")){
        if(li.classList.contains("players")){
            li.classList.remove("players");
        }
      if(li.getAttribute("li-index") == player.index){
           li.classList.add("players");
        }
   }
}
