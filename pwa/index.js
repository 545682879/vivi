if (navigator.serviceWorker) {
  console.log('浏览器支持Service Worker');

  navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service worker 已注册成功'))
      .catch(err => console.error('Service worker 注册失败'));
} else {
  console.log('不支持Service Worker');
}