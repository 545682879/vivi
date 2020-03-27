const cacheName = 'my-pwa-cache';

self.addEventListener('install', event => {
    console.log('Service Worker 正在安装');

    // 将./src/cache.js文件内容加入cache
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.add('./src/cache.js'))
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker 已激活，刷新页面后的请求都会走Service Worker');
});

self.addEventListener('push', event => {
  console.log('push', event);
});

self.addEventListener('fetch', event => {
    console.log('Service Worker 处理fetch请求');

    const url = new URL(event.request.url);

    // 如果是同域请求，且请求path为/src/other.js，则返回cache中的内容
    if (url.origin == location.origin && url.pathname == '/src/main.js') {

        // 返回缓存中的./src/cache.js文件内容
        event.respondWith(caches.match('./src/cache.js'));
    }
});