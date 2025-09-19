const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// A little Volume Control 
const volumeControl = document.getElementById('volume-control');
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('song-search');

const songs = ['SneakySnitch', 'PlayThatFunkyMusic', 'Funkytown','Doodledo','LivinOnAPrayer'];
let songIndex = 2;

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = song;
  
  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(song);
    playSong();
    updateActiveSong();
  });
  
  playlist.appendChild(li);
});

function updateActiveSong() {
  const items = playlist.querySelectorAll('li');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === songIndex);
  });
}

updateActiveSong();


function renderPlaylist(filter = "") {
  playlist.innerHTML = "";

  let filtered = songs.filter(song =>
    song.toLowerCase().includes(filter.toLowerCase())
  );

  filtered = filtered.slice(0, 2);

  filtered.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song;

    li.addEventListener('click', () => {
      songIndex = songs.indexOf(song);
      loadSong(song);
      playSong();
      updateActiveSong();
    });

    playlist.appendChild(li);
  });
}

function updateActiveSong() {
  const items = playlist.querySelectorAll('li');
  items.forEach((item, idx) => {
    item.classList.toggle('active', songs.indexOf(item.textContent) === songIndex);
  });
}

renderPlaylist();

searchInput.addEventListener('input', () => {
  renderPlaylist(searchInput.value);
});


