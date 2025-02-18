// SpotifyAuth.js

// 1. Configuration variables for Spotify API authentication
const clientId = "89bdfd0100ca4a79ace001736d341676"; 
const redirectUri = "http://localhost:5173/callback";
const scope = "playlist-modify-public"; 

//loon variable accessToken
let accessToken;

// objekt mis hoiab mu teisi funktsioone, jooksutab, getAccess token funktsiooni, et saada access tokenit ja kui juba on see ss returnib kohe selle.
const SpotifyAuth = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // 4. Check if the access token is present in the URL (after redirection from Spotify login)
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      // Extract the token from the URL
      accessToken = tokenMatch[1];

      // konverteerin aja stringist numbriks
      const expiresIn = Number(expiresMatch[1]);

      // Settupin timeri kaua access token aktiivne on
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Some security stuff, et ei naitaks url'is tokenit
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      // Kui ei ole tokenit siis loob spotify lingi ja saadab inimese sinna
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}` +
                `&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}` +
                `&scope=${encodeURIComponent(scope)}`;


      window.location = authUrl; // Redirects the browser to Spotify's login/authorization page
    }
  },

  // Selle meetodiga saab otsida ss TRACKE spotifyst
  async search(term) {
    // Siin saab valid access tokeni
    const token = SpotifyAuth.getAccessToken();

    // 8. Teen API requesti spotify endpointi
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );

    // ootan spoyify response
    const jsonResponse = await response.json();

    // Kui on tracke siis returnin need, kui ei siis see line returnib tühja array
    if (!jsonResponse.tracks) return [];

    // kasutan map et minna üle igast array elemendist ja eraldan need
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
    }));
  },
};

export default SpotifyAuth;
