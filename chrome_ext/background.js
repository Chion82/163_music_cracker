function requestListener(details) {
  if (details.url.includes('core.js')) {
	  console.log('Redirecting request...');
	  return {
	      redirectUrl : 'https://cdn.rawgit.com/Chion82/163_music_cracker/master/core.js'
	  };
  }
  /*
   if (details.url.includes('pt_content_song.js')) {
	  console.log('Redirecting request...');
	  return {
	      redirectUrl : 'http://localhost:3838/pt_content_song.js'
	  };
  }*/
}

chrome.webRequest.onBeforeRequest.addListener(requestListener, 
  {urls: ["http://*.music.126.net/*"]},
  ["blocking"]);

