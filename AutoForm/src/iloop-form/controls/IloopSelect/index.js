/**
 *
 * @author czw
 * @since 2019/8/1
 */
import React from 'react';
import { Select } from 'antd';
// import requestNoRest from '@/utils/request';
// import fetch from 'isomorphic-fetch';
import axios from 'axios';
// import querystring from 'querystring';
import common from '../../utils/common';
import { DependencesContext } from '../../context';
import qs from 'querystring';
const { getContainer, getSelectOptions, generateFieldName, getExactName } = common;

const URL_PATH = '/otm/res/list';
// const URL_PATH = 'https://ilooptest.tf56.com/iloopTms/motorcade/list';
class IloopSelect extends React.Component {
  static contextType = DependencesContext;

  constructor(props) {
    super(props);
    const initProps = {};
    try {
      initProps.dependences = JSON.parse((props.dependencyTemplateInputUiId || '').replace(/^0$/, '') || '[]').map((it)=>{
        return generateFieldName(props.keys.pageKey, props.keys.formKey, it, props.keys.key)
      });
    } catch (a) {
      initProps.dependences = [];
    }
    
    // 数据格式
    // ["水路", "陆路"]
    // [{label: 'water', name: '水路'}, {label: 'road', name: '陆路'}]
    try {
      initProps.list = !props.reqUrl ? JSON.parse(props.rspFields || '[]') : [];
    } catch (a) {
      initProps.list = [];
    }
    
    try {
      initProps.reqParams = props.reqUrl ? JSON.parse(props.reqParams || '{}') : {};
    } catch (a) {
      initProps.reqParams = {};
    }


    try {
      initProps.rspFields = props.reqUrl ? JSON.parse(props.rspFields || '{}') : {};
    } catch (a) {
      initProps.rspFields = {};
    }
    this.state = {
      defaultValue: ['multiple', 'tags'].includes(props.mode) ? [] : '',
      reqUrl: props.reqUrl,
      ...initProps,
    };
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillReceiveProps(_nextProps, nextContext) {
    const { dependences } = this.context;
    if (this.compare(nextContext.dependences, dependences)) {
      this.loadList(nextContext);
    }
  }

  /**
   * 比较上次与档次context的变化
   */
  compare = (nextContext, currentContext) => {
    const { dependences } = this.state;
    let flag = false;
    (dependences || []).forEach(it => {
      if (nextContext[it] !== currentContext[it]) {
        flag = true;
      }
    });
    return flag;
  };

  loadList = nextContext => {
    const { dictionaryType, mode, keys } = this.props;
    const { reqUrl, reqParams, dependences } = this.state;
    const dependencesTmp = {};
    const type = qs.parse((window.location.search||'').replace('?', '')).type;
    if (nextContext && nextContext.dependences) {
      (dependences || []).forEach(it => {
        //if(nextContext.dependences[it]){
          dependencesTmp[getExactName(keys, it)] = nextContext.dependences[it];
        //}
      });
    }
    const isDictionaryType = (dictionaryType || '').replace('String', '');
    let url = '';
    let params = {};
    // 数据字典
 
    // url配置
    if (reqUrl) {
      url = `${reqUrl}`;
      params = {...(reqParams||{}), ...(dependencesTmp||{})};
    }else if(isDictionaryType){
      let otmDictionaryData = null;
      try {
        // @ts-ignore
        otmDictionaryData = JSON.parse(localStorage.getItem('otm_data_dictionary')) || {};
      } catch (a) {
        otmDictionaryData = {};
      }
      if(otmDictionaryData[isDictionaryType]){
          let defaultValue = ['multiple', 'tags'].includes(mode) ? [] : '';
          let resultList = otmDictionaryData[isDictionaryType].map(item => {
            if (item.isDisplay && type === 'create') {
              if(['multiple', 'tags'].includes(mode)){
                // @ts-ignore
                defaultValue.push(item.rvalue);
              }else{
                defaultValue = item.rvalue;
              }
            }
            return item.rvalue;
          });
          this.setState({ list: resultList, defaultValue }, () => {
            if(type === 'create'){
              if(defaultValue && (!Array.isArray(defaultValue) || (Array.isArray(defaultValue) && defaultValue.length))){
                this.triggerChange(defaultValue);
              }
            }
          });
          return;
      } else {
        url = `${URL_PATH}?rgroup=${dictionaryType}&pageSize=1000&pageNum=0`
        params = {
          rgroup : dictionaryType,
          pageSize: 1000,
          pageNum: 0
        }
        // url = `${URL_PATH}`
      }
    }

    if (url) {
      // const request = window.g_request || fetch;
      axios.get(`${url}`, {
        params: params
      }).then(result => {
        console.log('result', params, result);
        // @ts-ignore
        if (result && result.data.code === 0) {
          let defaultValue = ['multiple', 'tags'].includes(mode) ? [] : '';
          const resultList = reqUrl
            ? result.data.data
            : (result.data.data || []).map(item => {
                if (item.isDisplay && type === 'create') {
                  if(['multiple', 'tags'].includes(mode)){
                    // @ts-ignore
                    defaultValue.push(item.rvalue);
                  }else{
                    defaultValue = item.rvalue;
                  }
                }
                return item.rvalue;
              });
          // console.log("resultList",resultList);
          this.setState({ list: resultList, defaultValue }, ()=>{
            if(type === 'create'){
              if(defaultValue && (!Array.isArray(defaultValue) || (Array.isArray(defaultValue) && defaultValue.length))){
                this.triggerChange(defaultValue);
              }
            }
          });
        } else {
          // message.error('系统异常');
        }
        // console.log('result', data);
      });
    }
  }

  componentDidMount() {
    this.loadList(this.context);
  }

  triggerChange = values => {
    const { onChange } = this.props;
    const { list, rspFields } = this.state;
    // 获取当前行的记录并返回给上层的changeValues
    const currentItem = (list || []).find(it => {
      return (it[rspFields.rspId || rspFields.rspKey || 'rvalue'] || it) === values;
    });
    if (onChange) {
      onChange(values, currentItem);
    }
  };

  render() {
    const { list, defaultValue, rspFields } = this.state;
    const { keys, dataDisctionary, name,  disabled, required, ...rest } = this.props;
    // console.log('select keys', keys);
    return (
      <Select
        // @ts-ignore
        getCalendarContainer={getContainer}
        disabled={disabled}
        defaultValue={ defaultValue }
        {...rest}
        onChange={this.triggerChange}
      >
        {required ? '': <Select.Option value="">请选择</Select.Option>}
        {getSelectOptions(list || [], rspFields.rspKey, rspFields.rspValues)}
      </Select>
    );
  }
}
export default IloopSelect;
