/**
 *
 * @author czw
 * @since 2019/8/1
 */
import React from 'react';
import { AutoComplete, Input, message, Icon } from 'antd';
import { get } from 'lodash/get';
import querystring from 'querystring';
import fetch from 'isomorphic-fetch';
import common from '../../utils/common';
import { DependencesContext } from '../../context';
import qs from 'querystring';
const { getContainer, getOptions, getAutoCompleteOptions, generateFieldName, getExactName, domainHome } = common;
//import data from './data';

class IloopAutoComplete extends React.Component {
  static contextType = DependencesContext;

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
    this.loadList(this.context);
    const { list, rspFields } = this.state;
    const {keys, valueInOptions, setAutocompleteOptions} = this.props;
    if(valueInOptions && setAutocompleteOptions && list.length){
      setAutocompleteOptions({[generateFieldName(keys.pageKey, keys.formKey, keys.fieldName, keys.key)]: getOptions(list, rspFields.rspKey)})
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
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

  /**
   * 加载数据源
   */
  loadList = (nextContext, anotherParams) => {
    const { reqUrl, reqParams, rspFields, dependences } = this.state;
    const { keys, valueInOptions, setAutocompleteOptions } = this.props;
    const type = qs.parse((window.location.search||'').replace('?', '')).type;
    const dependencesTmp = {};
    let defaultValue = "";
    let defaultRow = {};
    if (nextContext && nextContext.dependences) {
      (dependences || []).forEach(it => {
        //if(nextContext.dependences[it]){
          dependencesTmp[getExactName(keys, it)] = nextContext.dependences[it];
        //}
      });
    }
    if (reqUrl) {
      const request = window.g_request || fetch;
      const params = {...(reqParams||{}), ...(dependencesTmp||{}), ...(anotherParams||{})};
      
      request(`${domainHome}${reqUrl}?${querystring.stringify(params)}`, {
        method: 'get',
      }).then(result => {
        let resultList = null;
        if (result && result.code === 0) {
          resultList = rspFields.rspList ? get(result, rspFields.rspList) : result.data || [];
        } else if (result && Array.isArray(result)) {
          resultList = result
        } else {
          message.error('系统异常');
        }
        if(resultList){
          if( !type || type === 'create' ){
            (resultList || []).forEach((it)=>{
              if(it.isDisplay){
                defaultValue = it[rspFields.rspKey];
                defaultRow = it;
              }
            });
          }
          this.setState({ list: resultList, defaultValue },  () => {
            if(defaultValue){
              const options = { props : { value: defaultRow[rspFields.rspId || rspFields.rspKey]} };
              this.triggerChange(defaultValue, options);
            }
            if(valueInOptions && setAutocompleteOptions){
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
  triggerChange = (values, options) => {
    let findId = options.props.value;
    const { fieldName, reloadOnChange, onChange } = this.props;
    const { list, rspFields } = this.state;

    // 获取当前行的记录并返回给上层的changeValue
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
  triggerSelect = (values, options) => {
    let findId = options.props.value;

    const { onChange } = this.props;
    const { list, rspFields } = this.state;
    // 获取当前行的记录并返回给上层的changeValue
    const currentItem = (list || []).find(it => {
      return `${it[rspFields.rspId || rspFields.rspKey]}` === findId;
    });
    if (onChange) {
      onChange(values, currentItem);
    }
  };

  render() {
    const { list, rspFields, defaultValue } = this.state;
    const { dataDisctionary, maxLength, disabled, url, param, onClick, ...rest } = this.props;
    return (
      <AutoComplete
        filterOption
        disabled={disabled}
        dropdownMatchSelectWidth={false}
        getPopupContainer={getContainer}
        {...rest}
        onSelect={this.triggerSelect}
        onChange={this.triggerChange}
        optionLabelProp="label"
        defaultValue={ defaultValue }
        dataSource={getAutoCompleteOptions(
          list || [],
          rspFields.rspKey,
          rspFields.rspValues,
          rspFields.rspId,
        )}
      >
        <Input maxLength={maxLength} disabled={disabled}  suffix={<Icon type="search" style={{color: "#d9d9d9"}}/>} onClick={onClick}/>
      </AutoComplete>
    );
  }
}
export default IloopAutoComplete;
