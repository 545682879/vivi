// @ts-nocheck
import qs from 'querystring';
import pathToRegexp from 'path-to-regexp';
// import request from './request';

const reWhitespace = /\s+/;

/**
 * 处理路径上带 : 冒号的情况
 * @param {String} url
 * @return {Function}
 */
function getPathHandle(url) {
  let compiled;
  let tokens;
  const hasColon = /:/.test(url);

  if (hasColon) {
    compiled = pathToRegexp.compile(url);
    tokens = [...pathToRegexp.parse(url)].slice(1);
  }

  /**
   * @param {Object} params 传入的请求参数对象，1部分可能会给路径，另一部分可能给 request.body
   * @return {Object} 返回处理过的 url, params
   */
  return function handle(params) {
    if (!hasColon) {
      return { url, params };
    }

    let targetUrl;

    try {
      targetUrl = compiled(params);
    } catch (err) {
      /* eslint-disable */
      console.warn(`${url}: parse params failed`, params);
      /* eslint-enable */
      throw err;
    }

    const targetParams = Object.keys(params).reduce((memo, key) => {
      const cur = memo;
      const exist = !!tokens.find(one => one.name === key);

      if (!exist) {
        cur[key] = params[key];
      }

      return cur;
    }, {});

    return {
      url: targetUrl,
      params: targetParams,
    };
  };
}

/**
 * @param {Object} params
 */
function delFalsyParam(params) {
  const cur = params;
  Object.keys(cur).forEach(key => {
    if (
      !cur[key] &&
      cur[key] !== false &&
      (typeof cur[key] !== 'number' || Number.isNaN(cur[key]))
    ) {
      delete cur[key];
    }
  });
}

/**
 * 1. obj对象的键名对应的键值为后台的请求路径
 * 2. 经过createService处理后，该键值转变为一个请求函数
 * 3. 该函数只有一个参数，类型为对象，返回值为Promise对象
 * @export
 * @param {Object} obj
 * @returns {Object}
 */
export default function createService(obj) {
  const service = {};

  Object.keys(obj).forEach(key => {
    let method;
    let url;
    const val = obj[key];
    const arr = val.split(reWhitespace);

    switch (arr.length) {
      case 1:
        method = 'POST';
        [url] = arr;
        break;
      case 2:
        [method, url] = arr;
        break;
      default:
        //
        break;
    }

    const pathHandle = getPathHandle(url);

    service[key] = (params = {}) => {
      const opts = pathHandle(params);
      const targetParams = opts.params;

      // eslint-disable-next-line no-unused-vars
      let targetUrl = opts.url;
      // eslint-disable-next-line no-unused-vars
      let options;

      delFalsyParam(targetParams);

      switch (method.toLowerCase()) {
        case 'get':
          options = {
            method: 'GET',
          };

          targetUrl = `${targetUrl}${
            Object.keys(targetParams).length > 0 ? `?${qs.stringify(targetParams)}` : ''
          }`;
          break;

        case 'put':
        case 'delete':
        case 'post':
        case 'post@json':
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            },
            body: targetParams,
          };
          break;

        case 'post@urlencoded':
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: targetParams,
          };
          break;
        case 'post@form':
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data;charset=UTF-8',
            },
            uploadOptions: targetParams,
          };
          break;
        default:
          //
          break;
      }

     // return request(targetUrl, options);
    };
  });

  return service;
}

/**
 * e.g.
 * url: /iloopTmp/contract/getContractLineList
 * prefix: /iloopTmp/contract/
 * action: getContractLineList
 * @export
 * @param {String} prefix
 * @param {Array[String]} actions 接口路径的最后的斜杠后面的字符串
 * @returns {Object}
 */
export function createConventionService(prefix, actions) {
  return createService(
    actions.reduce((memo, action) => {
      const cur = memo;
      cur[action] = `${prefix}${action}`;
      return cur;
    }, {})
  );
}
