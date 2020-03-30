/* eslint-disable no-param-reassign */
import router from 'umi/router';

// 拼接url
export function joinUrl(prefix, url) {
  url = url.trim();

  if (/^\/\//.test(url) || /^(http|https):/.test(url)) return url;

  if (prefix.substr(-1) !== '/') {
    prefix += '/';
  }

  if (url.charAt(0) === '/') {
    return prefix + url.substring(1);
  }

  return prefix + url;
}

export default function push(path) {
  if (window.location.href.indexOf('/full') > -1) {
    if (typeof path === 'string') {
      path = joinUrl('/full', path);
    } else {
      path.pathname = joinUrl('/full', path.pathname);
    }
  }
  router.push(path);
}

export function isMatchPathName(pathname, url) {
  return pathname === url || pathname === joinUrl('/full', url);
}
