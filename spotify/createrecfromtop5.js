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

const topTracksIds = [
  '2e2AXpIiJpet5b4qg85Gh6','6slx17BRYMWmKAd9CAP3n5','0Z6nryp4FW5BFJbV5KDQr5','4N1bImT4gKiioHdC9oqlaY','01SfTM5nfCou5gQL70r6gs'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
