const musicContainer=document.querySelector('.music-container')
const playBtn=document.querySelector('#play')
const prevBtn=document.querySelector('#prev')
const nextBtn=document.querySelector('#next')
const audio=document.querySelector('#audio')
const progress=document.querySelector('.progress')
const progressContainer=document.querySelector('.progress-container')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')
const artists=document.querySelector('.artists')
const artistInfo=document.querySelector('#info')
const table= document.querySelector('#songList');
const row=document.querySelectorAll('.row');
const promptSong=document.querySelector('#promptSong')

const songs=['song1','song2','song3']
const info=['artist1', 'artist2', 'artist3' ]

let songIndex=2 //intialize to anything
let songTotal=3

//initially load song into DOM
loadSong(songs[songIndex])

fillQueue()

//Update song details
function loadSong(song) {
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`covers/${song}.jpg`;
    artistInfo.innerText=info[songIndex];
}

function playSong () {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

function prevSong() {
    songIndex=(2+songIndex)%3;
    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex=(songIndex+1)%3;
    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime}=e.srcElement
    const progressPercent= (currentTime/duration)*100
    progress.style.width=`${progressPercent}%`
}

function setProgress(e) {
    const width=this.clientWidth
    const clickX=e.offsetX
    const duration=audio.duration
    audio.currentTime=(clickX/width)*duration
}

//Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying=musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})

//Change song events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

cover.addEventListener('click', ()=> {
    artists.classList.toggle('active');
})

function fillQueue() {
    let i=1;
    while(i<=3) {
        row[i].children[0].innerText=i;
        row[i].children[1].innerText=`${songs[i-1]}`
        console.log(row[i])
        i++;
    }
}

$('#songList').find('tr').click( function(){
    loadSong(songs[($(this).index())-1])
    playSong()
    });

    promptSong.addEventListener('click', ()=> {
        let songName= prompt("Please enter the name of the song: ");
        let artistName= prompt("Please enter the name of the artist(s): ");
        if(songName==null || songName==''){
            return;
        }
        if(artistName==null || artistName==''){
            return;
        }
        songs.push(songName);
        info.push(artistName);
        newRow=document.createElement('tr');
        newRow.classList.add('row');
        newTD=document.createElement('td');
        newTD1=document.createElement('td');
        table.appendChild(newRow);
        newRow.appendChild(newTD);
        newRow.appendChild(newTD1);
        newRow.children[0].innerText=songTotal+1;
        newRow.children[1].innerText=songName;
        songTotal=songTotal+1;
    })
    promptSong.addEventListener('mousedown', ()=> {
        promptSong.style.boxShadow="inset 3px 3px 5px rgba(0, 0, 0, 0.658), inset -3px -3px 5px white";
    })
    promptSong.addEventListener('mouseup', ()=> {
        promptSong.style.boxShadow="3px 3px 5px rgba(0, 0, 0, 0.658), -3px -3px 5px white";
    })