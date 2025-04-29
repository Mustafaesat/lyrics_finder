// filepath: lyrics-finder/lyrics-finder/src/script.js
document.getElementById('lyricsForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const artist = document.getElementById('artist').value.trim();
    const song = document.getElementById('song').value.trim();
    const lyricsDiv = document.getElementById('lyrics');

    if (!artist || !song) {
        lyricsDiv.textContent = 'Please enter both artist and song name.';
        return;
    }

    lyricsDiv.textContent = 'Fetching lyrics...';

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
        if (!response.ok) {
            throw new Error('Lyrics not found');
        }
        const data = await response.json();
        lyricsDiv.textContent = data.lyrics || 'No lyrics found.';
    } catch (error) {
        lyricsDiv.textContent = 'Error fetching lyrics. Please try again.';
    }
});