import React from 'react';
import { Select, AutoComplete } from 'antd';
const AutoOption = AutoComplete.Option;
const { Option } = Select;


function getContainer() {
    return document.querySelector('.ant-layout') ? document.querySelector('.ant-layout') : document.body;
    // return document.getElementById('main');
}

/**
 * 获取Select组件的Option
 * @param {*} lists
 * @param {*} keyName
 * @param {*} valueName
 */
function getSelectOptions(lists, keyName, valueName) {
   // console.log('getSelectOptions', lists, keyName, valueName);
    let valueNames = null;
    if (valueName) {
        if (Array.isArray(valueName)) {
            valueNames = valueName;
        } else {
            valueNames = [valueName];
        }
    }

    const results = (lists || []).map(item => {
        const key = keyName ? item[keyName] : ((item||'').name || item);
        const value = valueNames ? item[valueNames[0]] : ((item||'').label || key);
        return ( <Option key = {key} value = {key} > {value} </Option> );
    });
    // console.log('getSelectOptions', results);
    return results;
}

function getOptions(lists, keyName ){
  return (lists || []).map(item => {
      const key = keyName ? item[keyName] : item;
      return key;
  })
}

/**
 * 获取AutoComplete组件的Option
 * @param {*} lists
 * @param {*} keyName
 * @param {*} valueName
 */
function getAutoCompleteOptions(lists, keyName, valueName, idName) {
    const list = (lists || []).map(item => {
        const valueNames = Array.isArray(valueName) ? valueName : [valueName];
        const key = keyName ? item[keyName] : item;
        const value = valueName ? item[valueName] : key;
        const id = idName ? `${item[idName]}` : key;
        // const width = domId  && document.getElementById(domId)? window.getComputedStyle(document.getElementById(domId)).width : '120px;'
        const width = '120px';
        const option = (<AutoOption key = { key } label={ key } value = { key }>{valueNames.length > 1 ? (<div data-id={ id || key }> {
              valueNames.map(it => {
                      return ( <span style = {
                              {
                                  display: 'inline-block',
                                  width,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  verticalAlign: 'middle',
                                  marginRight: '10px',
                              }
                          } > { item[it] } </span>
                      );
                  })
              } </div>) : (<span data-id={ id || key }>{value}</span>)}</AutoOption>);
        return option;
    });
    return list;
}


// function getExactNameExg(pageKey, formKey, key){
//   return new RegExp(`${pageKey}-${formKey}-([\\w]+)(${key?'-':''}${key?key:''})?`);
// }

function getExactName(_keys, str){
  const arr = (str||'').split('-');
  const last = arr.pop();
  if(!/^\d+$/.test(last)){
    return last;
  }else{
    return arr.pop();
  }
}

/**
 * 生成唯一键
 */
function guid() {
    return `${Date.now()}${String(Math.random()).replace('.', '')}`;
}

/**
 * 生成域名
 * @param {*} pageKey
 * @param {*} formKey
 * @param {*} field
 * @param {*} key
 */
function generateFieldName(pageKey = '', formKey = '', field= '', key = '') {
    if(field.indexOf(":")===0){
      return (field||'').replace(":", "");
    }
    let templateName = formKey;
    let fieldName = field;
    if(field.indexOf('.')>=0) {
      templateName = field.split('.')[0];
      fieldName = field.split('.')[1];
    }
    if( templateName!==formKey ){
      const name = `${pageKey||''}${pageKey ? '-' : ''}${templateName||''}${templateName ? '-' : ''}${fieldName||''}`
      return name;
    } else {
      const name = key ?
        `${pageKey||''}${pageKey ? '-' : ''}${templateName||''}${templateName ? '-' : ''}${fieldName||''}-${key||''}` :
        `${pageKey||''}${pageKey ? '-' : ''}${templateName||''}${templateName ? '-' : ''}${fieldName||''}`
      return name;
    }
}

/**
 * 下划线转驼峰
 * @param {*} name
 */
function toHump(name) {
    return name.replace(/_(\w)/g, function(_all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 解析地址
 * @param {*} item
 * @param {*} values
 */
function parseAddress(item, values, formType) {
    const result = {};
    const rspFields = JSON.parse(item.rspFields || '{}');
    const names = [
        rspFields.provinceCode || item.fieldName,
        rspFields.provinceName || 'PN',
        rspFields.cityCode || 'CC',
        rspFields.cityName || 'CN',
        rspFields.regionCode || 'RC',
        rspFields.regionName || 'RN',
    ];

    if (formType === 'detail') {
        return `${values[rspFields.provinceName] || ''}${values[rspFields.cityName] || ''}${values[
      rspFields.regionName
    ] || ''}`;
    }

    names.forEach(name => {
        result[name] = values[name];
    });

    if(result[names[0]]){
      return result;
    } else {
      return null;
    }
}

/**
 * 表单控件值
 */
function getFormDataCombineExtJson(){
  const extJsonReg = /[\w]*ExtJson$/g;
  const dataSources = Array.from(arguments);
  const extJson = {};
  const result = {};
  (dataSources || []).forEach((dataSource)=>{
    Object.keys(dataSource).forEach((key) => {
      if(extJsonReg.test(key)){
        if(extJson[key]){
          extJson[key] = {...extJson[key], ...JSON.parse(dataSource[key] || '{}')}
        } else {
          extJson[key] = JSON.parse(dataSource[key] || '{}')
        }
      } else {
        result[key] = dataSource[key];
      }
    })
  })
  for(let key in extJson){
    result[key] = JSON.stringify(extJson[key]);
  }
  return result;
}

/**
 * 赋值操作
 * @param {*} items
 * @param {*} values
 */
function createInitialValue(items, values) {
    const result = {};
    const extJsonResult = {};
    let extJsonName = '';
    if (values) {
        (items || []).forEach(item => {
            extJsonName = `${toHump(item.tableName)}ExtJson`;
            if (item.isExtjson) {
                const extJsonValues = JSON.parse(values[extJsonName] || '{}');
                if (item.inputType === 'address') {
                    // @ts-ignore
                    const address = parseAddress(item, extJsonValues);
                    Object.assign(extJsonResult, address);
                } else {
                    extJsonResult[item.fieldName] = extJsonValues[item.fieldName];
                }
            } else if (item.inputType === 'address') {
                // @ts-ignore
                const address = parseAddress(item, values);
                Object.assign(result, address);
            } else {
                result[item.fieldName] = values[item.fieldName];
            }
        });
    } else {
        (items || []).forEach(item => {
            result[item.fieldName] = null;
        });
    }

  return extJsonName ? {...result, [extJsonName]: JSON.stringify(extJsonResult)} : result;
}


// 数字转换成大写
function digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖',
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟'],
    ];
    const head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    // s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}

const domainHome = 'http://localhost:3000';
export default {
    getContainer,
    getOptions,
    getSelectOptions,
    getAutoCompleteOptions,
    guid,
    generateFieldName,
    toHump,
    parseAddress,
    createInitialValue,
    getFormDataCombineExtJson,
    getExactName,
    digitUppercase,
    domainHome
};