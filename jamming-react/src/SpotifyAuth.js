// SpotifyAuth.js
const clientId = "89bdfd0100ca4a79ace001736d341676";
const redirectUri = "http://localhost:5173/callback";
const scope = "playlist-modify-public";

let accessToken;

const SpotifyAuth = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check if the access token is present in the URL (after redirection from Spotify login)
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      // Extract the token from the URL
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);

      // Clear the access token after it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Remove the token from the URL for security
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      // If there's no token, redirect to Spotify's authorization page
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}` +
                      `&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}` +
                      `&scope=${encodeURIComponent(scope)}`;

      window.location = authUrl;
    }
  },

  // Search for tracks on Spotify
  async search(term) {
    const token = SpotifyAuth.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) return [];

    // Note: Added the "uri" property which is needed when adding tracks to a playlist
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  // Save a playlist to Spotify
  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs || trackURIs.length === 0) return;

    const token = SpotifyAuth.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      // 1. Get the current user's Spotify ID
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers,
      });
      if (!userResponse.ok) throw new Error("Failed to fetch user information");
      const userData = await userResponse.json();
      const userId = userData.id;

      // 2. Create a new playlist for the user
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({
            name: playlistName,
            description: "Created with Jamming",
            public: true, // or false if you want a private playlist
          }),
        }
      );
      if (!createPlaylistResponse.ok)
        throw new Error("Failed to create playlist");
      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // 3. Add tracks to the newly created playlist
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({
            uris: trackURIs,
          }),
        }
      );
      if (!addTracksResponse.ok)
        throw new Error("Failed to add tracks to playlist");

      console.log(`Playlist "${playlistName}" saved to Spotify successfully!`);
      return await addTracksResponse.json();
    } catch (error) {
      console.error("Error saving playlist to Spotify:", error);
    }
  },
};

export default SpotifyAuth;
