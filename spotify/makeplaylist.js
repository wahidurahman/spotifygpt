// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBuexaxD-SFthfybQ8lC_l8d3rkBbsd-MVs6Aa-2FbeHfODns6mXxYc5FEPA725K06ZkxZzPvDzowWeMnIXUkmAos6w4r-M82T9E9O2G5VhEoLbSBX68eSN-BdkfoBUPFy9zt5mHMXxjdnZgn9fxL-0OnwQhFUcpVb_5rgfWCWpwEYJg2ZLpB3PZjCwfwDg82-pY6n0npTxGLoJs00eIyUDaBm6yMa0sx2jWCncOikI1VoRR_ryq_18N1BtJrp7FgMZ';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:2e2AXpIiJpet5b4qg85Gh6','spotify:track:4P9Q0GojKVXpRTJCaL3kyy','spotify:track:6slx17BRYMWmKAd9CAP3n5','spotify:track:4glzmYpBRjWTj7GGTrbSY8','spotify:track:0Z6nryp4FW5BFJbV5KDQr5','spotify:track:2AQzUTNoARvzd42LrWFddf','spotify:track:4N1bImT4gKiioHdC9oqlaY','spotify:track:2jelGWgZNWLahhcAmG0bui','spotify:track:01SfTM5nfCou5gQL70r6gs','spotify:track:5SBg0pSxGWUMZHtncEWfzH'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')
  
  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })
  
  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
