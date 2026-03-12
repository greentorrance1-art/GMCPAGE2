// Great Minds Creating - Top Music Player
// Persistent music player bar at top of page
// EP Playlist Version

let topPlayerAudio = null;
let currentRelease = null;
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

// ============================================
// LOAD TRACK
// ============================================

function loadTrack(index) {

    if (index >= playlist.length) {
        index = 0;
    }

    currentTrackIndex = index;

    topPlayerAudio.src = playlist[currentTrackIndex];
}

// ============================================
// LOAD NEWEST RELEASE
// ============================================

async function loadNewestRelease() {

    // Create audio player
    topPlayerAudio = new Audio();
    topPlayerAudio.volume = 0.8;

    // Load first song
    loadTrack(0);

    // Auto play next track when one ends
    topPlayerAudio.addEventListener("ended", function () {

        currentTrackIndex++;

        if (currentTrackIndex >= playlist.length) {
            currentTrackIndex = 0;
        }

        loadTrack(currentTrackIndex);
        topPlayerAudio.play();

    });

    if (typeof firebase === "undefined" || !firebase.firestore) {

        console.log("Firebase not available, using placeholder");
        showPlaceholderPlayer();
        return;

    }

    try {

        const snapshot = await firebase
            .firestore()
            .collection("songs")
            .orderBy("releaseDate", "desc")
            .limit(1)
            .get();

        if (snapshot.empty) {

            console.log("No releases found, using placeholder");
            showPlaceholderPlayer();
            return;

        }

        currentRelease = snapshot.docs[0].data();
        updateTopPlayer(currentRelease);

    } catch (error) {

        console.error("Error loading newest release:", error);
        showPlaceholderPlayer();

    }

}

// ============================================
// UPDATE PLAYER UI
// ============================================

function updateTopPlayer(release) {

    const title = document.getElementById("topPlayerTitle");
    const artist = document.getElementById("topPlayerArtist");
    const coverImg = document.getElementById("topPlayerCover");

    if (title) {
        title.textContent = release.title || "MIND > MATTER";
    }

    if (artist) {
        artist.textContent = release.artist || "Great Minds Creating";
    }

    if (coverImg) {

        if (release.coverImage) {

            coverImg.src = release.coverImage;
            coverImg.alt = release.title;

        } else {

            coverImg.style.display = "none";

        }

    }

    const spotifyLink = document.getElementById("topPlayerSpotifyLink");

    if (spotifyLink) {

        if (release.spotifyLink) {

            spotifyLink.href = release.spotifyLink;
            spotifyLink.style.display = "flex";

        } else {

            spotifyLink.href =
                "https://open.spotify.com/album/6wUYfAEUysLOeR0uK5I7w1";

        }

    }

}

// ============================================
// PLACEHOLDER PLAYER
// ============================================

function showPlaceholderPlayer() {

    const title = document.getElementById("topPlayerTitle");
    const artist = document.getElementById("topPlayerArtist");
    const cover = document.getElementById("topPlayerCover");
    const spotifyLink = document.getElementById("topPlayerSpotifyLink");

    if (title) {
        title.textContent = "MIND > MATTER";
    }

    if (artist) {
        artist.textContent = "Great Minds Creating";
    }

    if (cover) {
        cover.style.display = "none";
    }

    if (spotifyLink) {

        spotifyLink.href =
            "https://open.spotify.com/album/6wUYfAEUysLOeR0uK5I7w1";

    }

}

// ============================================
// PLAY BUTTON
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const playBtn = document.getElementById("topPlayerPlayBtn");

    if (!playBtn) return;

    playBtn.addEventListener("click", function () {

        if (!topPlayerAudio) {
            console.log("Audio not ready yet");
            return;
        }

        if (topPlayerAudio.paused) {

            topPlayerAudio.play();
            playBtn.innerHTML = "❚❚";

        } else {

            topPlayerAudio.pause();
            playBtn.innerHTML = "▶";

        }

    });

    // Load player
    loadNewestRelease();

});
