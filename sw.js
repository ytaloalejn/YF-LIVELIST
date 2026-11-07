/* YF LiveList 1.0 - las actualizaciones de contenido solo se descargan cuando el usuario pulsa "Actualizar" */
var C="yf-shell",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
function precache(c){return Promise.all(F.map(function(f){return fetch(new Request(f,{cache:"reload"})).then(function(r){if(!r.ok)throw 0;return c.put(f,r)})}))}
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){
  return c.match("index.html").then(function(r){return r?r.clone().text():""}).then(function(t){return t.indexOf("chk=")>-1?null:precache(c)})}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.open(C).then(function(c){return c.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.url.indexOf("chk=")>-1}).map(function(k){return c.delete(k)}))})})
  .then(function(){return caches.keys()}).then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);
  if(u.searchParams.has("chk")){e.respondWith(fetch(e.request,{cache:"no-store"}));return}
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(x){if(x&&x.ok&&u.origin===self.location.origin){var cp=x.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return x}).catch(function(){return caches.match("./")})}))});
