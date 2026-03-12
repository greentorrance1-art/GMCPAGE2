// Great Minds Creating - Top Music Player
// Persistent music player bar at top of page

let topPlayerAudio = null;
let currentRelease = null;

// ============================================
// LOAD NEWEST RELEASE
// ============================================

async function loadNewestRelease() {

    // Create audio element for playback
    topPlayerAudio = new Audio("assets/audio/mind-matter-preview.mp3");

    if (typeof firebase === 'undefined' || !firebase.firestore) {
        console.log('Firebase not available, using placeholder');
        showPlaceholderPlayer();
        return;
    }

    try {

        const snapshot = await firebase.firestore()
            .collection('songs')
            .orderBy('releaseDate', 'desc')
            .limit(1)
            .get();

        if (snapshot.empty) {
            console.log('No releases found, using placeholder');
            showPlaceholderPlayer();
            return;
        }

        currentRelease = snapshot.docs[0].data();
        updateTopPlayer(currentRelease);

    } catch (error) {

        console.error('Error loading newest release:', error);
        showPlaceholderPlayer();

    }
}

// ============================================
// UPDATE PLAYER UI
// ============================================

function updateTopPlayer(release) {

    document.getElementById('topPlayerTitle').textContent =
        release.title || "MIND > MATTER";

    document.getElementById('topPlayerArtist').textContent =
        release.artist || "Great Minds Creating";

    const coverImg = document.getElementById('topPlayerCover');

    if (release.coverImage) {

        coverImg.src = release.coverImage;
        coverImg.alt = release.title;

    } else {

        coverImg.style.display = "none";

    }

    const spotifyLink = document.getElementById('topPlayerSpotifyLink');

    if (release.spotifyLink) {

        spotifyLink.href = release.spotifyLink;
        spotifyLink.style.display = "flex";

    } else {

        spotifyLink.href =
            "https://open.spotify.com/album/6wUYfAEUysLOeR0uK5I7w1";

    }

}

// ============================================
// PLACEHOLDER PLAYER
// ============================================

function showPlaceholderPlayer() {

    document.getElementById('topPlayerTitle').textContent =
        "MIND > MATTER";

    document.getElementById('topPlayerArtist').textContent =
        "Great Minds Creating";

    const cover = document.getElementById('topPlayerCover');

    if (cover) {
        cover.style.display = "none";
    }

    const spotifyLink = document.getElementById('topPlayerSpotifyLink');

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
            console.log("Audio not loaded yet");
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

    // Load newest release when page loads
    loadNewestRelease();

});
