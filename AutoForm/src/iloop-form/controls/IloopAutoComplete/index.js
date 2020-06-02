// @ts-nocheck
/**
 *
 * @author czw
 * @since 2019/8/1
 */
import React from 'react';
import { AutoComplete, Input } from 'antd';
import { Icon } from '@ant-design/compatible';
import { get } from 'lodash/get';
// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import common from '../../utils/common';
import { DependencesContext } from '../../context';
import qs from 'querystring';
const { getContainer, getOptions, getAutoCompleteOptions, generateFieldName, getExactName, domainHome } = common;
//import data from './data';

class IloopAutoComplete extends React.Component {
  static contextType = DependencesContext;

  /**
   * @param {{ dependencyTemplateInputUiId: any; keys: { pageKey: any; formKey: any; key: any; }; reqParams: any; rspFields: any; reqUrl: any; }} props
   */
  constructor(props) {
    super(props);
    const initProps = {};
    try {
      initProps.dependences = JSON.parse((props.dependencyTemplateInputUiId||'').replace(/^0$/, '')|| '[]').map((it)=>{ 
        return generateFieldName(props.keys.pageKey, props.keys.formKey, it, props.keys.key)
      });
    } catch (a) {
      initProps.dependences = [];
    }  

    try {
      initProps.reqParams = JSON.parse(props.reqParams || '{}');
    } catch (a) {
      initProps.reqParams = {};
    }

    try {
      initProps.rspFields = JSON.parse(props.rspFields || '{}');
    } catch (a) {
      initProps.rspFields = {};
    }

    try {
      initProps.list = !props.reqUrl ? JSON.parse(props.rspFields || '[]') : [];
      //initProps.list = data || [];
    } catch (a) {
      initProps.list = [];
    }

    this.state = {
      keys: props.keys,
      reqUrl: props.reqUrl,
      ...initProps,
    };
    this.triggerChange = this.triggerChange.bind(this);
    this.triggerSelect = this.triggerSelect.bind(this);
  }

  componentDidMount() {
    // @ts-ignore
    this.loadList(this.context);
    const { list, rspFields } = this.state;
    const {keys, valueInOptions, setAutocompleteOptions} = this.props;
    if(valueInOptions && setAutocompleteOptions && list.length){
      setAutocompleteOptions({[generateFieldName(keys.pageKey, keys.formKey, keys.fieldName, keys.key)]: getOptions(list, rspFields.rspKey)})
    }
  }

  /**
   * @param {any} nextProps
   * @param {{ dependences: any; }} nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    const { dependences } = this.context;
    if (this.compare(nextContext.dependences, dependences)) {
      // @ts-ignore
      this.loadList(nextContext);
    }
  }

  /**
   * 比较上次与档次context的变化
   */
  /**
   * @param {{ [x: string]: any; }} nextContext
   * @param {{ [x: string]: any; }} currentContext
   */
  compare = (nextContext, currentContext) => {
    const { dependences } = this.state;
    let flag = false;
    (dependences || []).forEach(it => {
      if ((nextContext||{})[it] !== (currentContext||{})[it]) {
        flag = true;
      }
    });
    return flag;
  };

  /**
   * 加载数据源
   */
  /**
   * @param {{ dependences: { [x: string]: any; }; }} nextContext
   * @param {any} anotherParams
   */
  loadList = (nextContext, anotherParams) => {
    const { reqUrl, reqParams, rspFields, dependences } = this.state;
    const { keys, valueInOptions, setAutocompleteOptions } = this.props;
    const type = qs.parse((window.location.search||'').replace('?', '')).type;
    const dependencesTmp = {};
    let defaultValue = "";
    let defaultRow = {};
    if (nextContext && nextContext.dependences) {
      // @ts-ignore
      (dependences || []).forEach(it => {
        //if(nextContext.dependences[it]){
          dependencesTmp[getExactName(keys, it)] = nextContext.dependences[it];
        //}
      });
    }

    if (reqUrl) {
      const params = {...(reqParams||{}), ...(dependencesTmp||{}), ...(anotherParams||{})};
        axios.get(`${reqUrl}`, {
          params: params
        }).then(result => {
        console.log('result', params, result);
        let resultList = null;
        if (result && result.data.code === 0) {
          resultList = rspFields.rspList ? get(result, rspFields.rspList) : result.data.data || [];
        } else if (result && Array.isArray(result.data)) {
          resultList = result.data
        } else {
          // message.error('系统异常');
        }
        if(resultList){
          if( !type || type === 'create' ){
            // @ts-ignore
            (resultList || []).forEach((it)=>{
              if(it.isDisplay){
                defaultValue = it[rspFields.rspKey];
                defaultRow = it;
              }
            });
          }
         // console.log("resultList",resultList);
          this.setState({ list: resultList, defaultValue },  () => {
            if(defaultValue){
              const options = { props : { value: defaultRow[rspFields.rspId || rspFields.rspKey]} };
              this.triggerChange(defaultValue, options);
            }
            if(valueInOptions && setAutocompleteOptions && (typeof setAutocompleteOptions === 'function')){
              // console.log('setAutocompleteOptions', setAutocompleteOptions);
              // @ts-ignore
              setAutocompleteOptions({[generateFieldName(keys.pageKey, keys.formKey, keys.fieldName, keys.key)]: getOptions(resultList, rspFields.rspKey)})
            }
          });
        }

      });
    }
  };

  /**
   * 触发改变
   */
  /**
   * @param {any} values
   * @param {{ props: { value: any; }; }} options
   */
  triggerChange = (values, options) => {
    let findId = options.props.children && options.props.children.props ? options.props.children.props['data-id'] : '';
    const { fieldName, reloadOnChange, onChange } = this.props;
    const { list, rspFields } = this.state;

    // 获取当前行的记录并返回给上层的changeValue
    // @ts-ignore
    const currentItem = (list || []).find(it => {
      return `${it[rspFields.rspId || rspFields.rspKey]}` === findId;
    });

    if(reloadOnChange) {
      let fn = rspFields.rspKey || fieldName ;
      // let anotherParams = `${fieldName}=${values}`;
      let anotherParams = {[fn]: values};
      this.loadList(this.context ,anotherParams);
    }
    if (onChange) {
      onChange(values, currentItem);
    }
  };

  /**
   * 触发改变
   */
  /**
   * @param {any} values
   * @param {{ props: { value: any; }; }} options
   */
  triggerSelect = (values, options) => {
    let findId = options.props.children && options.props.children.props ? options.props.children.props['data-id'] : '';
    const { onChange } = this.props;
    const { list, rspFields } = this.state;
    // 获取当前行的记录并返回给上层的changeValue
    // @ts-ignore
    const currentItem = (list || []).find(it => {
      return `${it[rspFields.rspId || rspFields.rspKey]}` === findId;
    });
    if (onChange) {
      onChange(values, currentItem);
    }
  };

  render() {
    const { list, rspFields, defaultValue } = this.state;
    const { keys, dataDisctionary, maxLength, disabled, url, param, onClick, ...rest } = this.props;
    // console.log('AutoComplete keys', keys);
    const ds = getAutoCompleteOptions(
      list || [],
      rspFields.rspKey,
      rspFields.rspValues,
      rspFields.rspId,
    );
    return (
      <AutoComplete
        filterOption
        disabled={disabled}
        dropdownMatchSelectWidth={false}
        // @ts-ignore
        getPopupContainer={getContainer}
        {...rest}
        // @ts-ignore
        onSelect={this.triggerSelect}
        // @ts-ignore
        onChange={this.triggerChange}
        optionLabelProp="label"
        defaultValue={ defaultValue }
        dataSource={ds}
      >
        <Input maxLength={maxLength} disabled={disabled}  suffix={<Icon type="search" style={{color: "#d9d9d9"}}/>} onClick={onClick}/>
      </AutoComplete>
    );
  }
}
export default IloopAutoComplete;
