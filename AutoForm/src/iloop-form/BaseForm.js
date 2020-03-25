/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { cloneDeep, isPlainObject } from 'lodash';
import common from './utils/common';
import { TIME_FORMAT, TIME_HHMM_FORMAT } from './utils/dateUtils';
import { DependencesContext } from './context';
import moment from 'moment';
const {toHump, parseAddress} = common;

export default class CreateForm extends Component {
  static contextType = DependencesContext;

  /**
   * 改变控件属性
   * @param {*} names
   * @param {*} property
   * @param {*} value
   */
  setAttributes(names, property, value) {
    const { formItems } = this.state;
    const targetFormItems = cloneDeep(formItems);
    if (isPlainObject(names)) {
      for(let name in names){
        // @ts-ignore
        (targetFormItems || []).forEach((it)=>{
          if(it.fieldName === name){
            Object.assign(it, {...names[name]})
          }
        });
      }
    } else {
      const changedNames = Array.isArray(names) ? names : [names];
      // @ts-ignore
      targetFormItems.forEach(it => {
        if (changedNames.includes(it.fieldName)) {
          it[property] = value;
        }
      });
    }
    const state = { formItems: targetFormItems };
    // @ts-ignore
    if(this.generataColumns){
      // @ts-ignore
      state.columns = this.generataColumns();
    }
    this.setState(state);
  }

  /**
   * 获取form表单里所有的依赖
   */
  // @ts-ignore
  getAllDependences(formItems){
      // @ts-ignore
      const allDependences = [];
      // @ts-ignore
      (formItems || []).forEach((it)=>{
          let dependencyTemplateInputUiId = [];
          try {
            dependencyTemplateInputUiId = JSON.parse((it.dependencyTemplateInputUiId||'').replace(/^0$/, '') || '[]');
          } catch (a) {
            dependencyTemplateInputUiId = []
          }
          // todo - 如果依赖来自不同的表，过滤掉其他的表的依赖
          // @ts-ignore
          allDependences.push(...dependencyTemplateInputUiId.filter((it)=>(it||'').indexOf(':')<0) ) ;
      });
      // @ts-ignore
      return allDependences;
  }

  /**
   * 根据控件类型给变量赋值
   */
  // @ts-ignore
  assignValue = (source, name, resultVal, inputType) => {
    // 查询条件日期
    if (inputType === 'date' && Array.isArray(resultVal)) {
      Object.assign(source, {
        [`${name}Start`]: resultVal[0],
        [`${name}End`]: resultVal[1],
      });
      // 查询地址
    } else if (inputType === 'address' || (inputType === 'component' && isPlainObject(resultVal))) {
      Object.assign(source, resultVal||{});
      // checkbox
    } else if (inputType === 'checkbox') {
      Object.assign(source, { [name]: Boolean(resultVal) });
      // 扩展字段
    } else {
      Object.assign(source, { [name]: resultVal });
    }
  };

  /**
   * 判断吃否扩展字段，给扩展字段赋值
   */
  // @ts-ignore
  assignFormItem = (targetData, inputType, isExtjson, tableName, name, resultVal) => {
    if (Number(isExtjson)) {
      // 扩展字段解析
      const extJsonFieldName = `${toHump(tableName)}ExtJson`;
      if (!targetData[extJsonFieldName]) {
        targetData[extJsonFieldName] = {};
      } else {
        targetData[extJsonFieldName] = JSON.parse(targetData[extJsonFieldName]);
      }
      // 赋值
      this.assignValue(targetData[extJsonFieldName], name, resultVal, inputType);
      // 扩展字段转换成字符串
      targetData[extJsonFieldName] = Object.keys(targetData[extJsonFieldName]).length
        ? JSON.stringify(targetData[extJsonFieldName])
        : null;
    } else {
      this.assignValue(targetData, name, resultVal, inputType);
    }
  };

  /**
   * 各种类型的数据初始化转换赋值
   */
  // @ts-ignore
  parseInitValue = (item, record, formType) => {
    const theRecord = Number(item.isExtjson) ? JSON.parse(record[`${toHump(item.tableName)}ExtJson`] || '{}') : record;
    let initialValue = theRecord[item.fieldName];
    if (formType === 'detail' || record.key === 'TOTAL') {
      if(item.inputType === 'address') {
        initialValue = parseAddress(item, theRecord, "detail");
      } 
      /*
      else if(item.inputType === 'time') {
        initialValue = theRecord[item.fieldName] ? moment(theRecord[item.fieldName]).format(item.format || (item.showTime ? TIME_FORMAT : TIME_HHMM_FORMAT)) : '';
      }
      */
    } else {
      if(item.inputType === 'address') {
        initialValue = parseAddress(item, theRecord, formType);
      } if(item.inputType === 'daterange' || (item.inputType === 'date' && formType === 'search')) {
        initialValue = record[`${item.fieldName}Start`] && record[`${item.fieldName}End`] ? [moment(record[`${item.fieldName}Start`]), moment(record[`${item.fieldName}End`])] : null; 
      } else if(item.inputType === 'date') {
        initialValue = theRecord[item.fieldName] ? moment(theRecord[item.fieldName]) : '';
      } else if(item.inputType === 'time') {
        initialValue = theRecord[item.fieldName] ? moment(theRecord[item.fieldName], item.format || (item.showTime ? TIME_FORMAT : TIME_HHMM_FORMAT)) : null;
      } else if(item.inputType === 'select') {
        if(['multiple', 'tags'].includes(item.mode) ) {
          if(theRecord[item.fieldName]){
            try{
              initialValue = JSON.parse(theRecord[item.fieldName]);
            }catch (a) {
              initialValue = theRecord[item.fieldName];
            }
          }else{
            initialValue = [];
          }
          
        }
      }
    }
    return initialValue;
  }

  /**
   * 获取表单数据源
   */
  getDataSource = () => {
    const { dataSource } = this.state;
    return dataSource;
  };

  /**
   * 添加校验
   */
  // @ts-ignore
  attachRules = (formItem, rules) => {
    const copyFormItems = cloneDeep(formItem);
    Object.keys(rules || []).forEach((rulename)=>{
      // @ts-ignore
      (copyFormItems || []).forEach((it)=>{
        if(it.fieldName === rulename){
          it.extraRules = rules[rulename];
        }
        return it;
      });
    });
    return copyFormItems;
  }

  /**
   * 转换formItems
   */
  // @ts-ignore
  convertFormItem(formItem, convert) {
    const copyFormItems = cloneDeep(formItem);
    if (isPlainObject(convert)) {
      for(let name in convert){
        // @ts-ignore
        (copyFormItems || []).forEach((it)=>{
          if(it.fieldName === name){
            Object.assign(it, {...convert[name]})
          }
        });
      }
      return copyFormItems;
    } else if (typeof convert ==='function') {
      return convert(copyFormItems);
    } else {
      return copyFormItems;
    }
  }

  // @ts-ignore
  setAutocompleteOptions = (item) => {
    const { autocompleteOptions } = this.state;
    this.setState({autocompleteOptions: {...autocompleteOptions, ...item}});
  }

  render() {
    return <span/>
  }
}
