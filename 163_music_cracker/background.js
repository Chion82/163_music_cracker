function requestListener(details) {
  if (details.url.includes('core.js')) {
	  console.log('Redirecting request...');
	  return {
	      //redirectUrl : 'https://cdn.rawgit.com/Chion82/163_music_cracker/bc1154f085bbc39e2d028a499de4e7317dabcfa2/core.js'
	      redirectUrl : 'http://localhost:3838/core.js'
	  };
  }
  
   if (details.url.includes('pt_content_playlist.js')) {
	  console.log('Redirecting request...');
	  return {
	  		redirectUrl : 'https://cdn.rawgit.com/Chion82/163_music_cracker/d3696029a4b6677cb978d097a59b6e12b86489b3/pt_content_playlist.js'
	      //redirectUrl : 'http://localhost:3838/pt_content_playlist.js'
	  };
  }
}

chrome.webRequest.onBeforeRequest.addListener(requestListener, 
  {urls: ["http://*.music.126.net/*"]},
  ["blocking"]);

