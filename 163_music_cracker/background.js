function requestListener(details) {
  if (details.url.includes('core.js')) {
	  console.log('Redirecting request...');
	  return {
	      redirectUrl : 'https://cdn.rawgit.com/Chion82/163_music_cracker/373fe0398dd8c3380db8bb06d06d38c6f3bee082/core.js'
	      //redirectUrl : 'http://localhost:3838/core.js'
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

