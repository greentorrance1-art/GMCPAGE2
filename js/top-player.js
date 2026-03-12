```javascript
// Great Minds Creating - Top Music Player
// EP Playlist Player

let audioPlayer = null;
let currentTrackIndex = 0;

// ============================================
// PLAYLIST (MIND > MATTER EP)
// ============================================

const playlist = [
  "assets/audio/ms.mp3",
  "assets/audio/last-time.mp3",
  "assets/audio/no-role-modelz.mp3",
  "assets/audio/scrimmage.mp3",
  "assets/audio/no-closure.mp3"
];

// Track names for UI
const trackNames = [
  "M's",
  "Last Time",
  "No Role Modelz",
  "Scrimmage",
  "No Closure"
];

// ============================================
// LOAD TRACK
// ============================================

function loadTrack(index) {

  if (index >= playlist.length) {
    index = 0;
  }

  currentTrackIndex = index;

  audioPlayer.src = playlist[currentTrackIndex];

  const title = document.getElementById("topPlayerTitle");
  if (title) {
    title.textContent = trackNames[currentTrackIndex];
  }

}

// ============================================
// INITIALIZE PLAYER
// ============================================

function initializePlayer() {

  audioPlayer = document.getElementById("audioPlayer");

  if (!audioPlayer) {
    console.log("Audio element not found");
    return;
  }

  audioPlayer.volume = 0.8;

  loadTrack(0);

  audioPlayer.addEventListener("ended", function () {

    currentTrackIndex++;

    if (currentTrackIndex >= playlist.length) {
      currentTrackIndex = 0;
    }

    loadTrack(currentTrackIndex);
    audioPlayer.play();

  });

}

// ============================================
// PLAY BUTTON
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  initializePlayer();

  const playBtn = document.getElementById("topPlayerPlayBtn");

  if (!playBtn) return;

  playBtn.addEventListener("click", function () {

    if (audioPlayer.paused) {

      audioPlayer.play();
      playBtn.innerHTML = "❚❚";

    } else {

      audioPlayer.pause();
      playBtn.innerHTML = "▶";

    }

  });

});
```
