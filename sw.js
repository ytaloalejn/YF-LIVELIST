/* YF LiveList 1.1 - guarda la app para usarla sin conexión; con conexión carga siempre la versión más reciente */
var C="yf-shell-2",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){
  return Promise.all(F.map(function(f){return fetch(new Request(f,{cache:"reload"})).then(function(r){if(r.ok)return c.put(f,r)}).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==self.location.origin)return;
  e.respondWith(new Promise(function(res){var done=false;
    function fromCache(){return caches.match(r,{ignoreSearch:true}).then(function(c){return c||caches.match("./")})}
    var t=setTimeout(function(){fromCache().then(function(c){if(c&&!done){done=true;res(c)}})},3000);
    fetch(u.href,{cache:"no-cache"}).then(function(x){clearTimeout(t);var cp=x&&x.ok?x.clone():null;if(!done){done=true;res(x)}
      if(cp)caches.open(C).then(function(c){c.put(r,cp)})})
    .catch(function(){clearTimeout(t);if(!done)fromCache().then(function(c){done=true;res(c||Response.error())})})}))});
