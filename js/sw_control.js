/* Register ServiceWorke r*/

 if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then(function (reg) {
      if(reg.installing){
        console.log("ServiceWorker installing");
      } else if(reg.waiting){
        console.log("ServiceWorker installed");
      } else if (reg.active) {
        console.log("ServiceWorker active");
      }
      console.log('ServiceWorker registration successful with scope: ', reg.scope);
    })
    .catch(function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


// if ('serviceWorker' in navigator) {
//   console.log("hallo");
//   navigator.serviceWorker.register('/sw.js', {scope: '/'})
//   .then(function(reg) {
//     // registration worked
//     console.log('Registration succeeded. Scope is ' + reg.scope);
//   }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
//   });
