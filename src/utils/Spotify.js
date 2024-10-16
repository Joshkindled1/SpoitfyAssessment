let accessToken = "";
const clientID = "2ce1eee45dab405db41bc7b59c92a9ea";
//const redirectUrl = "http://localhost:3000";
const redirectUrl = "https://joshspotifytest.surge.sh";



const Spotify = {

 

    getAccessToken() {
        // First check for the access token
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        //Second check for the access token
        // Second check for the access token
        if (tokenInURL && expiryTime) {
            // setting access token and expiry time variables
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);
            console.log(accessToken, expiresIn);
        
        // Setting the access token to expire at the value for expiration time
        // If expires_in = 3600 (1 hour), accessToken'll be cleared after 1 hour (3600 * 1000 ms = 3,600,000 ms or 1 hour).
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // clearing the url after the access token expires
        window.history.pushState("Access token", null, "/");
        return accessToken;
        }else{
            // Third check for the access token if the first and second check are both false
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = redirect;
          }




    },

    async search(term) {
        if(term === null || term === undefined || term === "")
        return;
      
        
        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse) {
              console.error("Response error");
            }
            return jsonResponse.tracks.items.map((t) => ({
              id: t.id,
              name: t.name,
              artist: t.artists[0].name,
              album: t.album.name,
              uri: t.uri,
            }));
          });
      },

     savePlayList(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        return  fetch(`https://api.spotify.com/v1/me`, { headers: header })                        // fetch my profile   
          .then((response) => response.json())
          .then((jsonResponse) => {                                                               // process the response of my own ID
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {                // fetch playlist of my profile and store the name of my new playlist
              headers: header,
              method: "post",
              body: JSON.stringify({ name: name }),
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  {
                    headers: header,
                    method: "post",
                    body: JSON.stringify({ uris: trackUris }),
                  }
                );
              });
          });
      },
      



    }; 
    export { Spotify };
    